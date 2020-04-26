import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { iterate } from "iterare";

export class ValidationException extends BadRequestException {

    public constructor(errors: ValidationError[], description: string = "Bad Request") {
        super(ValidationException.flattenValidationErrors(errors), description);
    }

    /**
     * Copied from https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
     *
     * @param errors
     */
    private static flattenValidationErrors(errors: ValidationError[] = []): string[] {
        return iterate(errors)
            .map(error => this.mapChildrenToValidationErrors(error))
            .flatten()
            .filter(item => !!item.constraints)
            .map(item => Object.values(item.constraints))
            .flatten()
            .toArray();
    }

    /**
     * Copied from https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
     *
     * @param error
     */
    private static mapChildrenToValidationErrors(error: ValidationError): ValidationError[] {
        if (!(error.children && error.children.length)) {
            return [error];
        }

        const validationErrors = [];

        for (const item of error.children) {
            if (item.children && item.children.length) {
                validationErrors.push(...this.mapChildrenToValidationErrors(item));
            }

            validationErrors.push(this.prependConstraintsWithParentProp(error, item));
        }

        return validationErrors;
    }

    /**
     * Copied from https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts
     *
     * @param parentError
     * @param error
     */
    private static prependConstraintsWithParentProp(parentError: ValidationError, error: ValidationError): ValidationError {
        const constraints: { [key: string]: string } = {};

        for (const key in error.constraints) {
            constraints[key] = `${parentError.property}.${error.constraints[key]}`;
        }

        return {
            ...error,
            constraints,
        };
    }

}

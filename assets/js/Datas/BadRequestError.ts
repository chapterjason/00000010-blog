import { ResponseError } from "./ResponseError";

export interface BadRequestError extends ResponseError {
    statusCode: 400;

    message: string | string[];
}

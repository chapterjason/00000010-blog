import { BadRequestError } from "./BadRequestError";

export interface ValidationError extends BadRequestError {
    message: string[];
}

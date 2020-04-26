import { ResponseError } from "./ResponseError";

export interface InternalServerErrorError extends ResponseError {
    statusCode: 500;
    message: string;
}

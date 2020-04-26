import { ResponseError } from "./ResponseError";

export interface NotFoundError extends ResponseError {
    statusCode: 404;

    message: string;
}

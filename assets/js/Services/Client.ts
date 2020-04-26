import axios, { AxiosError } from "axios";
import { ClientInterface } from "./ClientInterface";

export class Client implements ClientInterface {

    protected base: string;

    public constructor(base: string) {
        this.base = base.replace(new RegExp("[/]+$"), "");
    }

    public static isRequestError<T>(error: AxiosError<T> | Error): error is AxiosError<T> {
        return typeof (error as AxiosError<T>).response !== "undefined";
    }

    public async get<T>(path: string) {
        return axios.get<T>(this.join(path));
    }

    public async post<T>(path: string, data: unknown) {
        return axios.post<T>(this.join(path), data);
    }

    public async patch<T>(path: string, data: unknown) {
        return axios.patch<T>(this.join(path), data);
    }

    public async delete<T>(path: string) {
        return axios.delete<T>(this.join(path));
    }

    protected join(path: string) {
        return this.base + "/" + path.replace(new RegExp("^[/]+"), "");
    }

}

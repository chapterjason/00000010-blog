import { ClientInterface } from "../Services/ClientInterface";
import { AxiosError, AxiosResponse } from "axios";

export class NotImplementedClient implements ClientInterface {
    public delete<T>(path: string): Promise<AxiosResponse<T>> {
        throw new Error("You probably forgot to put <ApplicationContextProvider>.");
    }

    public get<T>(path: string): Promise<AxiosResponse<T>> {
        throw new Error("You probably forgot to put <ApplicationContextProvider>.");
    }

    public patch<T>(path: string, data: unknown): Promise<AxiosResponse<T>> {
        throw new Error("You probably forgot to put <ApplicationContextProvider>.");
    }

    public post<T>(path: string, data: unknown): Promise<AxiosResponse<T>> {
        throw new Error("You probably forgot to put <ApplicationContextProvider>.");
    }

}

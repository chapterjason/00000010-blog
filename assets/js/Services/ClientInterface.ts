import { AxiosResponse } from "axios";

export interface ClientInterface {

    get<T>(path: string): Promise<AxiosResponse<T>>;

    post<T>(path: string, data: unknown): Promise<AxiosResponse<T>>;

    patch<T>(path: string, data: unknown): Promise<AxiosResponse<T>>;

    delete<T>(path: string): Promise<AxiosResponse<T>>;

}

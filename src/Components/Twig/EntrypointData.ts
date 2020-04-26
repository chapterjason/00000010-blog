export interface EntrypointData {
    entrypoints: {
        [key: string]: {
            js?: string[];
            css?: string[];
        },
    };

    integrity?: {
        [key: string]: string;
    };
}

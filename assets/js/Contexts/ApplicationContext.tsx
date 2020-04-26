import * as React from "react";
import { NotImplementedClient } from "./NotImplementedClient";
import { ApplicationContextProps } from "./ApplicationContextProps";

export const ApplicationContext = React.createContext<ApplicationContextProps>({
    client: new NotImplementedClient(),
});

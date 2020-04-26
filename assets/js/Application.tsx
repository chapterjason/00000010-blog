import "bootstrap";
import "../css/app.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Application } from "./Components/Application";

declare global {
    interface Window {
        host: string;
    }
}

ReactDOM.render(<Application base={window.host}/>, document.getElementById("root"));

import * as React from "react";
import { Spinner } from "react-bootstrap";

export function Loading() {
    return (
        <div className="text-center">
            <Spinner animation="grow"/>
        </div>
    );
}

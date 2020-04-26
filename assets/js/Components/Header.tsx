import { HeaderProps } from "./HeaderProps";
import * as React from "react";
import { Col, Row } from "react-bootstrap";

export function Header(props: HeaderProps) {
    const { children, title } = props;

    return (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h1>{title}</h1>
                    </Col>
                    {children && (
                        <Col className="d-flex justify-content-end align-items-center">
                            {children}
                        </Col>
                    )}
                </Row>
                <hr className="mt-0"/>
            </Col>
        </Row>
    );
}

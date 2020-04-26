import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import * as React from "react";

export function Navigation() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
            <Container>
                <Link className={"navbar-brand"} to={"/"}>NestJS Single Page Application</Link>
                <Navbar.Toggle aria-controls="top-navbar-nav"/>
                <Navbar.Collapse id="top-navbar-nav">
                    <Nav className="mr-auto">
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to={"/"}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={"nav-link"} to={"/cats"}>Cats</NavLink>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

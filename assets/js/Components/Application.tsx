import { HashRouter, Route, Switch } from "react-router-dom";
import { Home } from "../Pages/Home";
import { ListCats } from "../Pages/Cats/ListCats";
import * as React from "react";
import { ApplicationContextProvider } from "../Contexts/ApplicationContextProvider";
import { Client } from "../Services/Client";
import { ApplicationContextProps } from "../Contexts/ApplicationContextProps";
import { ApplicationProps } from "./ApplicationProps";
import { CreateCat } from "../Pages/Cats/CreateCat";
import { Col, Container, Row } from "react-bootstrap";
import { Navigation } from "./Navigation";
import { EditCat } from "../Pages/Cats/EditCat";

export function Application(props: ApplicationProps) {
    const { base } = props;
    const client = new Client(base);

    const applicationContext: ApplicationContextProps = {
        client,
    };

    return (
        <ApplicationContextProvider value={applicationContext}>
            <HashRouter>
                <Navigation/>
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/cats/edit/:id" component={EditCat}/>
                                <Route path="/cats/create" component={CreateCat}/>
                                <Route path="/cats" component={ListCats}/>
                            </Switch>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col className="text-center">
                            <strong>
                                NestJS Single Page Application
                            </strong>{" "}
                            Created with <span className="fa fa-heart text-danger"/> by{" "}
                            <a href="https://github.com/chapterjason" rel="noopener noreferrer"
                               target="_blank">
                                chapterjason
                            </a>
                        </Col>
                    </Row>
                </Container>
            </HashRouter>
        </ApplicationContextProvider>
    );
}

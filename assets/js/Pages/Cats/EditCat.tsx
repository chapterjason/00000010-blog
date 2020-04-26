import { ApplicationContext } from "../../Contexts/ApplicationContext";
import * as React from "react";
import { Cat } from "../../Datas/Cat";
import { Client } from "../../Services/Client";
import { ValidationError } from "../../Datas/ValidationError";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useMount } from "react-use";
import { NotFoundError } from "../../Datas/NotFoundError";
import { ResponseError } from "../../Datas/ResponseError";

export function EditCat() {
    const { id } = useParams();
    const { client } = React.useContext(ApplicationContext);
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const history = useHistory();

    useMount(async () => {
        setLoading(true);
        try {
            const response = await client.get<Cat>("/api/cats/" + id);
            setLoading(false);
            setName(response.data.name);
        } catch (error) {
            if (Client.isRequestError<NotFoundError>(error)) {
                setError(error.response.data.message);
            } else {
                setError(error.message);
            }
        }
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!isLoading) {
            setName(event.currentTarget.value);
        }
    }

    async function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (!isLoading) {
            if ("Enter" === event.key) {
                await handleClick();
            }
        }
    }

    async function handleClick() {
        if (!isLoading) {
            setLoading(true);
            setError("");
            try {
                await client.patch<Cat>("/api/cats/" + id, { name });
                setName("");
                setLoading(false);
                history.push("/cats");
            } catch (error) {
                if (Client.isRequestError<ResponseError>(error)) {
                    const message = error.response.data.message;
                    if (Array.isArray(message)) {
                        setError(message.join("\n"));
                    } else {
                        setError(message);
                    }
                    if(400 === error.response.status) {
                        setLoading(false);
                    }
                } else {
                    setError(error.message);
                }
            }
        }
    }

    const disabled = isLoading ? { disabled: true } : {};

    return (
        <Row className="justify-content-md-center">
            <Col md="5">
                <Header title="Edit Cat">
                    <Button variant="secondary" size="sm" onClick={history.goBack}>
                        <span className="fas fa-chevron-left"/> Back
                    </Button>
                </Header>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter cat's name"
                                          onKeyPress={handleKeyPress}
                                          onChange={handleChange}
                                          value={name}
                                          {...disabled}/>
                        </Form.Group>
                        {error.length > 0 && (
                            <Alert variant="danger">{error}</Alert>
                        )}
                        <Button variant="primary" onClick={handleClick} {...disabled}>
                            {isLoading ? (
                                <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
                            ) : (
                                <span>Save</span>
                            )}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

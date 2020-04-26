import { ApplicationContext } from "../../Contexts/ApplicationContext";
import * as React from "react";
import { Cat } from "../../Datas/Cat";
import { Client } from "../../Services/Client";
import { ValidationError } from "../../Datas/ValidationError";
import { useHistory } from "react-router-dom";
import { Header } from "../../Components/Header";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

export function CreateCat() {
    const { client } = React.useContext(ApplicationContext);
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);
    const history = useHistory();

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
                await client.post<Cat>("/api/cats", { name });
                setName("");
            } catch (error) {
                if (Client.isRequestError<ValidationError>(error)) {
                    setError(error.response.data.message.join("\n"));
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
                history.push("/cats");
            }
        }
    }

    const disabled = isLoading ? { disabled: true } : {};

    return (
        <Row className="justify-content-md-center">
            <Col md="5">
                <Header title="Create Cat">
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
                                <span>Create</span>
                            )}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

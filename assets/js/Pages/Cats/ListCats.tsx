import * as React from "react";
import { useList, useMount } from "react-use";
import { Link, useHistory } from "react-router-dom";
import { ApplicationContext } from "../../Contexts/ApplicationContext";
import { Cat } from "../../Datas/Cat";
import { Header } from "../../Components/Header";
import { Loading } from "../../Components/Loading";
import { Alert, Button, ButtonGroup, Table } from "react-bootstrap";

export function ListCats() {
    const history = useHistory();
    const { client } = React.useContext(ApplicationContext);
    const [isLoading, setLoading] = React.useState(false);
    const [cats, { set: setCats }] = useList([]);

    async function load() {
        try {
            const response = await client.get<Cat[]>("/api/cats");
            setCats(response.data);
        } catch (error) {

        }
    }

    useMount(async function () {
        setLoading(true);
        await load();
        setLoading(false);
    });

    function CatRow(props: { cat: Cat }) {
        const { cat } = props;

        async function handleDelete() {
            try {
                await client.delete("/api/cats/" + cat.id);
            } finally {
                await load();
            }
        }

        async function handleEdit() {
            history.push("/cats/edit/" + cat.id);
        }

        return (
            <tr>
                <td>
                    <span className="fas fa-cat"/> {cat.name}
                </td>
                <td>
                    <ButtonGroup>
                        <Button variant="secondary" size="sm" onClick={handleEdit}>
                            <span className="fas fa-edit"/>
                        </Button>
                        <Button variant="danger" size="sm" onClick={handleDelete}>
                            <span className="fas fa-times"/>
                        </Button>
                    </ButtonGroup>
                </td>
            </tr>
        );
    }

    return (
        <React.Fragment>
            <Header title="Cats">
                <Link className={"btn btn-primary btn-sm"} to={"/cats/create"}>
                    <span className="fas fa-plus"/> Create Cat
                </Link>
            </Header>
            {isLoading ? (
                <Loading/>
            ) : (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.length > 0 ? (
                            cats.map(cat => <CatRow key={cat.id} cat={cat}/>)
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center">
                                    <Alert variant="info">
                                        No cats found! Why don't you <Link to="/cats/create">create</Link> one?
                                    </Alert>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </React.Fragment>
    );
}

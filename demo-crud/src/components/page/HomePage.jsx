import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function HomePage() {
    const [data, setData] = useState([]);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8000/users")
        setData(result.data);

    }


    useEffect(() => {
        loadUser()
    }, [])
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Home Page</h2>
            <Table striped bordered hover style={{textAlign:"center"}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th colSpan={3}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) =>
                        <tr key={i}>
                            <td scope='row'>{i + 1}</td>
                            <td>{e.id}</td>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                            <td>{e.age}</td>
                            <td>{e.phone}</td>
                            <td> <Button variant="info"><i className="fa-solid fa-eye"></i></Button></td>
                            <td>
                                <Link to={`/user/edit/${e.id}`}>
                                <Button variant="warning">Edit</Button>
                                </Link>
                            </td>
                            <td> <Button variant="danger">Delete</Button></td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default HomePage
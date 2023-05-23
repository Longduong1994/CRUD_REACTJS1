import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function HomePage() {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(true);
    const [view, setView] = useState(null)

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8000/users")
        setData(result.data);

    }


    useEffect(() => {
        loadUser()
    }, [checked])

    const handleDelete = async (id) => {
        const result = await axios.delete(`http://localhost:8000/users/${id}`)
        setChecked(!checked);
    }
    const [show, setShow] = useState(false);

    const handleClose = (id) => setShow(false);
    const handleShow = (e) => {
        setView(e);
        setShow(true);
    };
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Home Page</h2>
            <table striped bordered hover style={{ textAlign: "center" }}>
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
                            <td> <Button variant="info" onClick={() => handleShow(e)}><i className="fa-solid fa-eye"></i></Button></td>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>User infor</Modal.Title>
                                </Modal.Header>
                                {view && (
                                    <>
                                        <Modal.Body>ID: {view.id}</Modal.Body>
                                        <Modal.Body>Username: {view.username}</Modal.Body>
                                        <Modal.Body>Email: {view.email}</Modal.Body>
                                        <Modal.Body>Age: {view.age}</Modal.Body>
                                        <Modal.Body>Phone: {view.phone}</Modal.Body>
                                    </>
                                )}
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <td>
                                <Link to={`/user/edit/${e.id}`}>
                                    <Button variant="warning">Edit</Button>
                                </Link>
                            </td>
                            <td> <Button variant="danger" onClick={() => handleDelete(e.id)}>Delete</Button></td>
                        </tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default HomePage
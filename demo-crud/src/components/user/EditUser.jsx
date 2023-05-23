import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import {useNavigate, useParams} from "react-router-dom"
import axios from 'axios';

function EditUser() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        age: "",
        phone: "",
    })
    // sử dụng cú pháp destructerings
    const { username, email, age, phone } = user;
    //sử dụng navigate để chuyển trang
    const navigate = useNavigate();

    const handleInput =(e)=>{
      setUser({...user,[e.target.name]:e.target.value})

    }
    // sử dụng useParam để lấy id
    const {id} = useParams();

    // Lấy dữ liệu người dùng từ homepage 
    const loadUser = async () =>{
    const result =  await axios.get(`http://localhost:8000/users/${id}`);
    setUser(result.data)

    }
    useEffect(()=>{
        loadUser()
    },[])
    
    const handleUpdate = async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/users/${id}`,user);
        navigate("/")
    }
  return (
    <div>
            <div className='w-75 mx-auto shadow p-5'>
                <h2>Update User</h2>
                <form onSubmit={handleUpdate}>
                    <label>UserName:</label>
                    <input type="text" name="username" value={username} onInput={(e) => handleInput(e)} /> <br />
                    <label>Email:</label>
                    <input type="text" name="email" value={email} onInput={(e) => handleInput(e)} /> <br />
                    <label>Age:</label>
                    <input type="text" name="age" value={age} onInput={(e) => handleInput(e)} /> <br />
                    <label>Phone:</label>
                    <input type="text" name="phone" value={phone} onInput={(e) => handleInput(e)} /> <br />
                    <Button variant="success" type='submit'>Update</Button>
                </form>
            </div>
        </div>
  )
}

export default EditUser
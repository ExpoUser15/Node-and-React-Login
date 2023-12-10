import React, {useEffect, useState} from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const [validate, setValidate] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login", data)
        .then(res => {
            const val = res.data;
            if(val.status === "Success"){
                navigate("/");
            }else{
                alert(val.message);
            }
        })
        .catch(err => alert(`${err.response.status} : ${err.response.statusText}`));

    }

    const inputUsername = (e) => {
        const val = e.target.value
        setData({...data, username: val});
    }

    const inputPassword = (e) => {
        const val = e.target.value;
        setData({...data, password: val});
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name='Username' onChange={inputUsername}/>
            <br /><br />
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={inputPassword}/>
            <br /><br />

            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login;
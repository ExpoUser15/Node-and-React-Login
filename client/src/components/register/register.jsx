import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [value, setValue] = useState({
    username: "",
    password: "",
    email: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/register', value)
    .then(response => {
        if(response.data.status === "Success"){
            alert(response.data.message);
            navigate("/login");
        }
    })
    .catch(err => alert(`${err.response.status} : ${err.response.statusText}`));
  }

  return (
   <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name='Username' onChange={e => setValue({...value, username: e.target.value})}/>
        <br /><br />
        <label htmlFor="password">Password</label>
        <input type="password" name='password' onChange={e => setValue({...value, password: e.target.value})}/>
        <br /><br />
        <label htmlFor="email">Email</label>
        <input type="email" name='email' onChange={e => setValue({...value, email: e.target.value})}/>
        <br /><br />
        <button type='submit'>Sign In</button>
      </form>
   </div>
  )
}

export default Register;

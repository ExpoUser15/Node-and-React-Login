import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000")
    .then(response => {
      const result = response.data;
      setData(result.data);
    })
    .catch(err => console.log(err));

    axios.get("http://localhost:3000/auth")
    .then(response => {
      if(response.data.status === "Authenticated"){
        setUser(response.data.username);
      }
    })
    .catch(err => {
      try {
        const res = err.response;
        if(res.status == 403){
          navigate("/login");
          alert(res.data.message);
        }else if(res.status == 401){
          navigate("/login");
          alert(res.data.message);
        }else if(res.data.status == "JWT Error"){
          navigate("/login");
          alert(res.data.message);
        }
      } catch (error) {
        alert(error);
      }
    });

  }, []);

  return (
   <div>
    <div id='notif'>Welcome {user}</div>
    <ul>
    {
      data.map((item) => (
        <li key={item._id}>
          <p>Nama: {item.username}</p>
          <p>Email: {item.email}</p>
        </li>
      ))
    }
    </ul>
   </div>
  )
}

export default App

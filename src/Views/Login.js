import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const navigate=useNavigate();

  const handleSavefood = async () => {
    const data = {
      email,
      password
    };
  
    try {
      const response = await axios.post("http://localhost:4000/api/loginUser", data);
      
      if (!response.data.success) {
        alert("Enter the Credentials");
      } else {
        localStorage.setItem("authToken", response.data.authToken);
        console.log(localStorage.getItem("authToken"));
        
        navigate("/");
      }
    } catch (error) {
      alert("An error happened, Please check console!");
      console.log(error);
    }
  };
  
  return (
    <div>
      <div>
        <div className='container'>
            
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="Email" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="Password" />
            </div>

            <button type="submit" className="btn btn-primary"onClick={handleSavefood}>Submit</button>
            <Link to="/createUser" className='m-3 btn btn-danger'>I'm a new user</Link>
        </div>
      </div>

    </div>
  )
}

export default Login

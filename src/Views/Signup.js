import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Signup() {
  
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [location,setLocation]=useState("")
  const navigate=useNavigate();

  const handleSavefood=()=>{

    const data={
      name,
      email,
      password,
      location
    };

    axios.post("http://localhost:4000/api/createUser",data)
    .then(() => {
      
      navigate("/login");
    })
    .catch((error) => {
      alert("An error happened, Please check console!");
      console.log(error);
    });
  }

  return (
    <div>
      <div>
        <div className='container'>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">User Name</label>
              <input type="text" className="form-control"value={name} onChange={(e)=>setName(e.target.value)} id="name" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email address</label>
              <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="Email" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} id="Password" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="address" className="form-control" value={location} onChange={(e)=>setLocation(e.target.value)} id="address" />
            </div>

            <button type="submit" className="btn btn-primary"onClick={handleSavefood}>Submit</button>
            <Link to="/Login" className='m-3 btn btn-danger'>Already a user</Link>
        </div>
      </div>

    </div>
  )
}

export default Signup

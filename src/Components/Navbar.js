import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'


function Navbar() {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-success p-2">
        <div className="container-fluid">
          <Link className="nav-link active text-light fs-1 fst-italic" aria-current="page" to="/">My Foods</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-4 text-light p-4 fst-italic" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-4 text-light p-4 fst-italic" aria-current="page" to="/">my orders</Link>
                </li>
                : ""
              }
            </ul>
            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>

                <Link className="btn bg-white text-success mx-1 fst-italic" to="/login">Login</Link>

                <Link className="btn bg-white text-success mx-1 fst-italic" to="/createUser">Signup</Link>
              </div>
              : <div>
                <div className='btn bg-white text-success mx-2'>
                  my card{" "}
                  <Badge pill bg='danger'>2</Badge>
                  </div>
                <div className='btn bg-white text-danger mx-2' onClick={handleLogout} >Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

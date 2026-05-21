import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const user =JSON.parse(localStorage.getItem("user"))

  const handlelogout=()=>{
    localStorage.removeItem("user")
    navigate("/login")
  }
  return (
    <nav>
        <h2>Jobnest</h2>
        <div>
            <Link to="/">Home</Link>
            {!user ?(
              <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              </>
            ):(
              <>
              {user.user.role==="user" && (
                <>
                <Link to="/myapplications">My Applications</Link>
                <Link to="/profile">Profile</Link>
                </>
              )}
              {user.user.role==="recruiter" &&(
                <>
                <Link to="/createjob">Create Job</Link>
                </>
              )}
              <span>Welcome,{user.user.name}</span>

              <button onClick={handlelogout}>Logout</button>
              </>
            )}
        </div>
    </nav>
  )
}

export default Navbar

import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { use } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Login.css"

function Login() {

    const [form,setform]=useState({
        email:"",
        password:"",
    })

    const navigate=useNavigate();

    const handlechange=(e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()

        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/users/login`,form)

            localStorage.setItem("user",JSON.stringify(res.data))

            alert("Login successful")
            if(res.data.user.role==="admin"){
              navigate("/admin")
            }
            else if(res.data.user.role==="recruiter"){
              console.log(res.data.user.role)
              navigate("/recruiterdashboard")
            }else{
              navigate("/")
            }

        }catch(err){
            alert("Login failed")
            console.log(err);
            
        }
    }


  return (
    <div className='login-page'>

    <div className='login-container'>

      <div className='login-header'>
        <h2>Welcome Back</h2>
        <p>Login to continue your job search journey.</p>
      </div>

      <form onSubmit={handlesubmit}>

        <div className='input-group'>
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder='Enter your email'
            onChange={handlechange}
          />
        </div>

        <div className='input-group'>
          <label>Password</label>
          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            onChange={handlechange}
          />
        </div>

        <button type='submit'>
          Login
        </button>

      </form>

      <p className='register-link'>
        Don't have an account?
        <Link to={"/register"}> Register</Link>
      </p>

    </div>

  </div>
  )
}

export default Login

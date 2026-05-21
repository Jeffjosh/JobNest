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
            if(res.data.user.role==="recruiter"){
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
    <div className='login-container'>
      <h2>User Login</h2>
      <form onSubmit={handlesubmit}>
        <input type="text" name="email" placeholder='Email' onChange={handlechange}/>
        <input type="password" name='password' placeholder='Password' onChange={handlechange}/>
        <button type='submit'>Login</button>
      </form>
      <p>
        Dont have an account?
        <Link to={"/register"}>Register</Link>
      </p>
    </div>
  )
}

export default Login

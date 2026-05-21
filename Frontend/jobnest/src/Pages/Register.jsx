import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Register.css"

function Register() {

    const [form,setform]=useState({
        name:"",
        email:"",
        password:"",
        role:"user"

    })

    const navigate=useNavigate()

    const handlechange=(e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()

        try{
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/users/register`,form)
            alert("Registration successful")
            navigate("/login")
        }catch(err){
            alert("Registration failed")
            console.log(err);
        }
    }
  return (
    <div className='register-container'>
      <h2>Create Account</h2>
      <form onSubmit={handlesubmit}>
        <input type="text" name='name' placeholder='Name' onChange={handlechange}/>
        <input type="text" name='email' placeholder='Email' onChange={handlechange}/>
        <input type="password" name='password' placeholder='Password' onChange={handlechange}/>
        <select name="role" id="" onChange={handlechange}>
            <option value="user">User</option>
            <option value="recruiter">Recruiter</option>
        </select>
        <button type='submit'>Register</button>
      </form>
      <p>
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  )
}

export default Register

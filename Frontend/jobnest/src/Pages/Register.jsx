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
        role:"user",
        companyname:"",
        companywebsite:""

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
    <div className='register-page'>

    <div className='register-container'>

      <div className='register-header'>
        <h2>Create Account</h2>
        <p>Join JobNest and explore new career opportunities.</p>
      </div>

      <form onSubmit={handlesubmit}>

        <div className='input-group'>
          <label>Full Name</label>
          <input
            type="text"
            name='name'
            placeholder='Enter your name'
            onChange={handlechange}
          />
        </div>

        <div className='input-group'>
          <label>Email</label>
          <input
            type="text"
            name='email'
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

        <div className='input-group'>
          <label>Account Type</label>

          <select
            name="role"
            onChange={handlechange}
          >
            <option value="user">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        {form.role === "recruiter" && (
          <div className='recruiter-fields'>

            <div className='input-group'>
              <label>Company Name</label>
              <input
                type="text"
                name="companyname"
                placeholder="Enter company name"
                onChange={handlechange}
              />
            </div>

            <div className='input-group'>
              <label>Company Website</label>
              <input
                type="text"
                name="companywebsite"
                placeholder="Enter company website"
                onChange={handlechange}
              />
            </div>

          </div>
        )}

        <button type='submit'>
          Create Account
        </button>

      </form>

      <p className='login-link'>
        Already have an account?
        <Link to="/login"> Login</Link>
      </p>

    </div>

  </div>
  )
}

export default Register

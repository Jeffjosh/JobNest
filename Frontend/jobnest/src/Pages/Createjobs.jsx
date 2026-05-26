import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import "./Createjobs.css"

function Createjobs() {
    const navigate=useNavigate()

    const [form,setform]=useState({
        title:"",
        description:"",
        company:"",
        location:"",
        salary:""
    })

    const handlechange=(e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()

        try{
            const user=JSON.parse(localStorage.getItem("user"))
            await axios.post(`${import.meta.env.VITE_API_URL}/jobs`,form,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Job created successfully")
            navigate("/recruiterdashboard")

        }catch(err){
            console.log(err.response.data);
            alert("Job creation failed")
            
        }
    }

  return (
    <div className='createjob-page'>

    <div className="createjob-container">

      <div className='createjob-header'>
        <h1>Create Job</h1>
        <p>Post a new opportunity and attract candidates.</p>
      </div>

      <form onSubmit={handlesubmit}>

        <div className='input-group'>
          <label>Job Title</label>
          <input
            type="text"
            name='title'
            placeholder='Enter job title'
            onChange={handlechange}
          />
        </div>

        <div className='input-group'>
          <label>Company Name</label>
          <input
            type="text"
            name='company'
            placeholder='Enter company name'
            onChange={handlechange}
          />
        </div>

        <div className='input-group'>
          <label>Job Description</label>
          <textarea
            name="description"
            placeholder='Describe the role and responsibilities'
            onChange={handlechange}
          />
        </div>

        <div className='form-row'>

          <div className='input-group'>
            <label>Location</label>
            <input
              type="text"
              name='location'
              placeholder='Enter location'
              onChange={handlechange}
            />
          </div>

          <div className='input-group'>
            <label>Salary</label>
            <input
              type="number"
              name='salary'
              placeholder='Enter salary'
              onChange={handlechange}
            />
          </div>

        </div>

        <button type='submit'>
          Create Job
        </button>

      </form>

    </div>

  </div>
  )
}

export default Createjobs

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
    <div>
      <Navbar />
      <div className="createjob-container">
        <h1>Create Jobs</h1>
        <form onSubmit={handlesubmit}>
            <input type="text" name='title' placeholder='Title' onChange={handlechange}/>
            <input type="text" name='company' placeholder='Company' onChange={handlechange}/>
            <textarea name="description" placeholder='Description' onChange={handlechange}/>
            <input type="text" name='location' placeholder='Location' onChange={handlechange}/>
            <input type="number" name='salary' placeholder='Salary' onChange={handlechange}/>
            <button type='submit'>Create Job</button>
        </form>
      </div>
      
    </div>
  )
}

export default Createjobs

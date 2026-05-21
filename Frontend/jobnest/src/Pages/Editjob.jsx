import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import './Editjob.css'

function Editjob() {

    const {id}=useParams()
    const navigate=useNavigate()

    const [form,setform]=useState({
        title:"",
        description:"",
        company:"",
        location:"",
        salary:""
    })

    const getjob=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`)

            setform(res.data.job)
        }catch(err){
            console.log(err);
        }
    }
    const handlechange=(e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()

        try{
            const user=JSON.parse(localStorage.getItem("user"))

            await axios.put(`${import.meta.env.VITE_API_URL}/jobs/${id}`,form,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Job updated successfully")
            navigate("/recruiterdashboard")
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        getjob()
    },[])

  return (
    <div>
      <div className='editjob-container'>
        <h1>Edit Job</h1>
        <form onSubmit={handlesubmit}>
            <input type="text" name='title' value={form.title} onChange={handlechange} placeholder='Title'/>
            <input type="text" name='company' value={form.company} onChange={handlechange} placeholder='Company'/>
            <textarea name="description" value={form.description} onChange={handlechange} placeholder='Description'/>
            <input type="text" name='location' value={form.location} onChange={handlechange} placeholder='Location'/>
            <input type="number" name='salary' value={form.salary} onChange={handlechange} placeholder='Salary'/>
            <div className='editjob-form-actions'>
                <button type='submit' className='btn-update'>Update Job</button>
            <button type='button' onClick={()=>navigate("/recruiterdashboard")} className='btn-cancel'>
                Cancel
            </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Editjob

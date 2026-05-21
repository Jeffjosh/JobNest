import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./Recruiterdashboard.css"
import Navbar from '../Components/Navbar'

function Recruiterdashboard() {
    const [jobs,setjobs]=useState([])

    const getjobs=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/jobs/myjobs`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            console.log(res.data);
            
            setjobs(res.data.jobs)
        }catch(err){
            console.log(err);
            
        }
    }
    const deletejob=async(id)=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            await axios.delete(`${import.meta.env.VITE_API_URL}/jobs/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Job deleted successfully")
            getjobs()
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        getjobs()
    },[])
  return (
    <div>
        <Navbar />
      <div className='dashboard-container'>
        <h1>Posted Jobs</h1>
        {
            jobs.length===0 ?(
                <p className='dashboard-empty'>No Jobs Posted Yet</p>
            ):(
                <div className='dashboard-list'>
                    {jobs.map((job)=>(
            <div className='dashboard-card' key={job._id}>
                <h2>{job.title}</h2>

                <h3>{job.company}</h3>
                <p>{job.description}</p>
                <p>{job.location}</p>
                <p>{job.salary}</p>
                <div className='dashboard-card-actions'>
                    <Link to={`/applications/${job._id}`} className='btn-view-apps'>
                    View Applications
                </Link>
                <Link to={`/editjob/${job._id}`} className='btn-edit'>
                    Edit Post
                </Link>
                <button type='button' onClick={()=>deletejob(job._id)} className='btn-delete'>Delete Post</button>
                </div>

            </div>
        ))}
                </div>
            )
        }
        
      </div>
    </div>
  )
}

export default Recruiterdashboard

import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import "./Home.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home() {

  const [jobs,setjobs]=useState([])
  const [search,setsearch]=useState("")
  const [location,setlocation]=useState("")

  const navigate=useNavigate()

  const getjobs=async()=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
    setjobs(res.data.jobs)
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))

    if(user?.user?.role==="recruiter"){
      navigate("/recruiterdashboard")
    }else{
      getjobs()
    }
  },[])

  const filterjobs=jobs.filter((job)=>{
    return(
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    ) &&
      job.location.toLowerCase().includes(location.toLowerCase())
  })

  return (
    <div>
      <Navbar />
      <div className='home-hero'>
        <h1>Explore Opportunities</h1>
      <p>Find The Perfect Role For You</p>
      </div>
      <div className='search-bar'>
        <input 
        type="text" 
        placeholder='Search job or company' 
        value={search}
        onChange={(e)=>setsearch(e.target.value)}
         />
         <input 
         type="text"
         placeholder='Search Location' 
         value={location}
         onChange={(e)=>setlocation(e.target.value)}
         />
      </div>
      
      <div className='jobs-container'>
        {filterjobs.map((job)=>(
        <div key={job._id} className='job-card'>
          <h2>{job.title}</h2>
          <h3>{job.company}</h3>
          <p>{job.description}</p>
          <p>Location:{job.location}</p>
          <p>Salary:{job.salary}</p>
          <Link to={`/jobs/${job._id}`}>
            <button>View Details</button>
          </Link>

        </div>
      ))}
      </div>
    </div>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import "./Myapplications.css"


function Myapplications() {
    const [application,setapplication]=useState([])

    const getapplication=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/applications/myapplications`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                })
                setapplication(res.data.applications)

        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        getapplication()
    },[])
  return (
    <div >
        <Navbar />
        <div className='myapps-container'>
            <h1>My Applications</h1>
        {application.length===0 ?(
            <p className='myapps-empty'>No applications found.</p>
        ):(
            application.map((app)=>(
            <div className="app-card" key={app._id}>
                <h2>{app.job.title}</h2>
                <h3>{app.job.company}</h3>
                <p>{app.job.location}</p>
                <p className='app-status'>Status: {app.status}</p>
            </div>
        ))
        )} 
        </div>
    </div>
  )
}

export default Myapplications

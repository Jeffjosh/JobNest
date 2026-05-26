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
    <div className='myapps-page'>

    <div className='myapps-container'>

      <div className='myapps-header'>
        <h1>My Applications</h1>
        <p>Track all the jobs you have applied for.</p>
      </div>

      {application.length === 0 ? (
        <div className='myapps-empty'>
          <h3>No Applications Yet</h3>
          <p>
            Start applying for jobs to see them here.
          </p>
        </div>
      ) : (

        <div className='applications-grid'>

          {application.map((app) => (
            app.job && (

              <div className="app-card" key={app._id}>

                <div className='app-top'>
                  <h2>{app.job.title}</h2>
                  <span className={`status ${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </div>

                <h3>{app.job.company}</h3>

                <div className='app-details'>
                  <p>
                    <strong>Location:</strong> {app.job.location}
                  </p>

                  <p>
                    <strong>Salary:</strong> {app.job.salary}
                  </p>
                </div>

              </div>

            )
          ))}

        </div>

      )}

    </div>

  </div>
  )
}

export default Myapplications

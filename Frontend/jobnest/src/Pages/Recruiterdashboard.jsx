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
   <div className='dashboard-page'>

    <div className='dashboard-container'>

      <div className='dashboard-header'>
        <div>
          <h1>Recruiter Dashboard</h1>
          <p>Manage all your posted jobs and applicants.</p>
        </div>

        <Link to="/createjob" className='btn-create-job'>
          + Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (

        <div className='dashboard-empty'>
          <h3>No Jobs Posted Yet</h3>
          <p>
            Start posting jobs to attract applicants.
          </p>

          <Link to="/createjob" className='btn-empty-create'>
            Create Job
          </Link>
        </div>

      ) : (

        <div className='dashboard-list'>

          {jobs.map((job) => (

            <div className='dashboard-card' key={job._id}>

              <div className='dashboard-card-top'>

                <div>
                  <h2>{job.title}</h2>
                  <h3>{job.company}</h3>
                </div>

                <span className='job-badge'>
                  Active
                </span>

              </div>

              <p className='job-description'>
                {job.description}
              </p>

              <div className='job-details'>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

              </div>

              <div className='dashboard-card-actions'>

                <Link
                  to={`/applications/${job._id}`}
                  className='btn-view-apps'
                >
                  View Applications
                </Link>

                <Link
                  to={`/editjob/${job._id}`}
                  className='btn-edit'
                >
                  Edit
                </Link>

                <button
                  type='button'
                  onClick={() => deletejob(job._id)}
                  className='btn-delete'
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
  )
}

export default Recruiterdashboard

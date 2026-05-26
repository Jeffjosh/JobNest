import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import "./Admin.css"

function Admin() {
    const [recruiters,setrecruiters]=useState([])
    const [jobs,setjobs]=useState([])

    const getpendingrecruiters=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            if(!user){
                return
            }

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/admin/recruiters/pending`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            setrecruiters(res.data)
        }catch(err){
            console.log(err);
            
        }
    }

    const approverecruiter=async(id)=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            if(!user){
                return
            }

            await axios.put(`${import.meta.env.VITE_API_URL}/admin/recruiters/approve/${id}`,{},
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Recruiter Approved")
            getpendingrecruiters()
        }catch(err){
            console.log(err);
            
        }
    }

    const getjobs=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)

            setjobs(res.data.jobs)
        }catch(err){
            console.log(err);
            
        }
    }

    const deletejobs=async(id)=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            if(!user){
                return
            }

            await axios.delete(`${import.meta.env.VITE_API_URL}/admin/jobs/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Job Deleted")
            getjobs()
        }catch(err){
            console.log(err);
            
        }
    }

    useEffect(()=>{
        getpendingrecruiters()
        getjobs()
    },[])
  return (
     <div className='admin-page'>

    <div className='admin-container'>

      <div className='admin-header'>
        <h1>Admin Dashboard</h1>
        <p>Manage recruiters and monitor all job postings.</p>
      </div>

      {/* ===== Pending Recruiters ===== */}

      <div className='admin-section'>

        <div className='section-header'>
          <h2>Pending Approvals</h2>
          <span>{recruiters.length} Requests</span>
        </div>

        {recruiters.length === 0 ? (

          <div className='admin-empty'>
            <h3>No Pending Approvals</h3>
            <p>All recruiter requests are reviewed.</p>
          </div>

        ) : (

          <div className='admin-grid'>

            {recruiters.map((rec) => (

              <div className='admin-card' key={rec._id}>

                <div className='admin-card-info'>

                  <h3>{rec.name}</h3>

                  <p>
                    <strong>Email:</strong> {rec.email}
                  </p>

                  <p>
                    <strong>Company:</strong> {rec.companyname}
                  </p>

                  <p>
                    <strong>Website:</strong>

                    <a
                      href={rec.companywebsite}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {rec.companywebsite}
                    </a>
                  </p>

                </div>

                <button
                  className='btn-approve'
                  onClick={() => approverecruiter(rec._id)}
                >
                  Approve Recruiter
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ===== Jobs ===== */}

      <div className='admin-section'>

        <div className='section-header'>
          <h2>All Jobs</h2>
          <span>{jobs.length} Jobs</span>
        </div>

        <div className='admin-grid'>

          {jobs.map((job) => (

            <div className='admin-card' key={job._id}>

              <div className='admin-card-info'>

                <h3>{job.title}</h3>

                <p>
                  <strong>Company:</strong> {job.company}
                </p>

                <p>
                  <strong>Description:</strong> {job.description}
                </p>

                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

              </div>

              <button
                className='btn-delete'
                onClick={() => deletejobs(job._id)}
              >
                Delete Job
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>
  )
}

export default Admin

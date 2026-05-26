import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import './Applicants.css'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'

function Applicants() {

    const {id}=useParams()
    const [applications,setapplications]=useState([])
    const[search,setsearch]=useState("")
    const[statusfilter,setstatusfilter]=useState("")
    const navigate=useNavigate()
    const getapplications=async()=>{
      try{
        const user=JSON.parse(localStorage.getItem("user"))

        const res=await axios.get(`${import.meta.env.VITE_API_URL}/applications/${id}/applications`,
          {
            headers:{
              Authorization:`Bearer ${user.token}`
            }
          }
        )
        console.log(res.data);
        setapplications(res.data.applications)
        
      }catch(err){
        console.log(err);
        
      }
    }

    const updatestatus=async(appid,status)=>{
      try{
        const user=JSON.parse(localStorage.getItem("user"))
        
        if(status === "shortlisted"){

          await axios.put(`${import.meta.env.VITE_API_URL}/applications/shortlist/${appid}`,
            {},
            {
              headers:{
                Authorization:`Bearer ${user.token}`
              }
            }
          )
        }else if(status ==="rejected"){
          await axios.put(`${import.meta.env.VITE_API_URL}/applications/reject/${appid}`,{},
            {
              headers:{
                Authorization:`Bearer ${user.token}`
              }
            }
          )
        }
        alert("Status updated")
        getapplications()

      }catch(err){
        console.log(err);
        
      }
    }
    useEffect(()=>{
      getapplications()
    },[])
    
  return (
    <div className='applicants-page'>

    

    <div className='applicants-container'>

      <div className='applicants-header'>
        <h1>Applicants</h1>
        <p>Manage and review job applicants.</p>
      </div>

      {applications.length === 0 ? (

        <div className='applicants-empty'>
          <h3>No Applicants Found</h3>
          <p>No one has applied for this job yet.</p>
        </div>

      ) : (

        <>

          <div className='applicants-filters'>

            <input
              type="text"
              placeholder='Search by name or skill'
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />

            <select
              value={statusfilter}
              onChange={(e) => setstatusfilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="applied">Applied</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
            </select>

          </div>

          <div className='applicants-list'>

            {applications
              .filter((app) => {

                const matchesearch =
                  app.user.name.toLowerCase().includes(search.toLowerCase()) ||
                  (
                    app.user.skills &&
                    app.user.skills.join("").toLowerCase().includes(search.toLowerCase())
                  )

                const matchesstatus =
                  statusfilter === "" || app.status === statusfilter

                return matchesearch && matchesstatus

              })
              .map((app) => (

                <div className='applicant-card' key={app._id}>

                  <div className='applicant-top'>

                    <div>
                      <h2>{app.user.name}</h2>
                      <h3>{app.user.email}</h3>
                    </div>

                    <span className={`status ${app.status}`}>
                      {app.status}
                    </span>

                  </div>

                  <div className='applicant-details'>

                    <p>
                      <strong>Qualification:</strong>
                      {app.user.qualification || " Not Added"}
                    </p>

                    <p>
                      <strong>Experience:</strong>
                      {app.user.experience || " Not Added"}
                    </p>

                    <p>
                      <strong>Skills:</strong>
                      {app.user.skills || " Not Added"}
                    </p>

                  </div>

                  <a
                    href={`${import.meta.env.VITE_API_URL.replace("/api", "")}${app.user.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className='resume-btn'
                  >
                    View Resume
                  </a>

                  <div className='applicant-actions'>

                    <button
                      className='btn-shortlist'
                      onClick={() => updatestatus(app._id, "shortlisted")}
                    >
                      Shortlist
                    </button>

                    <button
                      className='btn-reject'
                      onClick={() => updatestatus(app._id, "rejected")}
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))}

          </div>

        </>

      )}

    </div>

  </div>
  )
}

export default Applicants

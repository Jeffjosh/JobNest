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
        
        await axios.put(`${import.meta.env.VITE_API_URL}/applications/status/${appid}`,{status},
          {
            headers:{
              Authorization:`Bearer ${user.token}`
            }
          }
        )
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
    <div>
      <Navbar />
      <div className='applicants-container'>
        <h1>Applicants</h1>
        {
          applications.length===0 ? (
            <p className='applicants-empty'>No applicants found.</p>

          ):(
            <div>
              <div className='applicants-filters'>
                <input 
                type="text" 
                placeholder='search by name or skill'
                value={search}
                onChange={(e)=>setsearch(e.target.value)}
                />
                <select 
                value={statusfilter}
                onChange={(e)=>setstatusfilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            
            <div className='applicants-list'>
              {
                applications.filter((app)=>{

                  const matchesearch=app.user.name.toLowerCase().includes(search.toLowerCase()) ||
                  (app.user.skills && app.user.skills.join("").toLowerCase().includes(search.toLowerCase()))

                  const matchesstatus=statusfilter==="" || app.status===statusfilter

                  return matchesearch && matchesstatus
                }).map((app)=>(
              
              <div className='applicant-card' key={app._id}>
                <h2>{app.user.name}</h2>
                <h3>{app.user.email}</h3>
                <p>Qualification:{app.user.qualification}</p>
                <p>Experience:{app.user.experience}</p>
                <p>Skills:{app.user.skills}</p>
                <p>Status:{app.status}</p>
                <a href={`${import.meta.env.VITE_API_URL.replace("/api","")}${app.user.resume}`}
                target="_blank"
                rel="noreferrer">
                  View Resume
                </a>
                <div className='applicant-actions'>
                  <button className='btn-shortlist' onClick={()=>updatestatus(app._id,"shortlisted")}>Shortlisted</button>
                  <button className='btn-reject' onClick={()=>updatestatus(app._id,"rejected")}>Reject</button>
                </div>
                {/* <button onClick={()=>navigate(`/messages/${app.user._id}`)}>
                  Message
                </button> */}
              </div>
            ))}
            </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Applicants

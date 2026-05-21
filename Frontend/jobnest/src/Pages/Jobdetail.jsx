import React, { useEffect, useState } from 'react'
import axios from 'axios'   
import { useParams } from 'react-router-dom'
import "./Jobdetail.css"
import Navbar from '../Components/Navbar';

function Jobdetail() {

    const{id}=useParams()

    const [job,setjobs]=useState()

    const [resume,setresume]=useState(null)

    const [coverletter,setcoverletter]=useState("")

    const [useprofileresume,setuseprofileresume]=useState(true)

    const [profile,setprofile]=useState(null)

    const [alreadyapplied,setalreadyapplied]=useState(false)



    const getjob=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/jobs/${id}`)
            console.log(res.data)
            setjobs(res.data.job)

        }catch(err){
            console.log(err);
            
        }
    }

    


    
    const handlapply=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))
            console.log(user);
            console.log(user.token);

            const formdata=new FormData()

            if(!useprofileresume && resume){
                formdata.append("resume",resume)
            }

            formdata.append("coverletter",coverletter)
            

            await axios.post(`${import.meta.env.VITE_API_URL}/applications/${id}/apply`,formdata,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            alert("Applied successful")
            setalreadyapplied(true)
        }catch(err){
            console.log(err);
            alert(err.response.data.message)
        }
    }

    const getprofile=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            console.log(res.data);
            setprofile(res.data)
        }catch(err){
            console.log(err);
        }
    }

    const checkapplication=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/applications/myapplications`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            const applied=res.data.applications.some(
                (app)=>app.job._id===id
            )
            setalreadyapplied(applied)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getjob()
        getprofile()
        checkapplication()
    },[])  

    if(!job){
        return <h1>Loading...</h1>
    }

  
  return (
    
    <div >
        <Navbar />
        <div className='jobdetail-container'>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>
            <hr className='jobdetail-divider' />
            <div className='apply-section'>
                <h3>Apply for this job</h3>
             <label className='resume-toggle' >
                <input 
                type="checkbox"
                checked={useprofileresume}
                onChange={()=>setuseprofileresume(!useprofileresume)} />
                Use current resume
            </label>
            {
                useprofileresume && profile?.resume && (
                    <a className='resume-link' href={`${import.meta.env.VITE_API_URL.replace("/api","")}${profile.resume}`}
                    target="_blank"
                    rel='noreferrer'
                    >
                        View Resume
                        </a>
                )
            }
            {
                !useprofileresume && (
                    <input 
                    type="file"
                    accept='.pdf'
                    onChange={(e)=>setresume(e.target.files[0])} />
                )
            }
            <textarea 
                placeholder='Write Your Coverletter'
                value={coverletter}
                onChange={(e)=>setcoverletter(e.target.value)}></textarea>
            <button 
            className="btn-apply" 
            onClick={handlapply}
            disabled={alreadyapplied}
            >
                {
                    alreadyapplied
                    ? "Already Applied"
                    : "Apply Now"
                }
             
             
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default Jobdetail

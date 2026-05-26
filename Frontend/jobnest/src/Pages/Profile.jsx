import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
import './Profile.css'
import navbar from '../Components/Navbar'
import Navbar from '../Components/Navbar'

function Profile() {

    const [form,setform]=useState({
        name:"",
        email:"",
        qualification:"",
        experience:"",
        skills:""
    })

    const [resume,setresume]=useState(null)

    const [currentresume,setcurrentresume]=useState("")

    const [editing,setediting]=useState(false)

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

            setform({
                name:res.data.name || "",
                email:res.data.email || "",
                qualification:res.data.qualification || "",
                experience:res.data.experience || "",
                skills:res.data.skills || "",
                
            })
            setcurrentresume(res.data.resume || "")

        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        getprofile()
    },[])

    const handlechange=(e)=>{
        setform({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handlesubmit=async(e)=>{
        e.preventDefault()

        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const formdata=new FormData()

            formdata.append("name",form.name)

            formdata.append("email",form.email)

            formdata.append("qualification",form.qualification)

            formdata.append("experience",form.experience)

            formdata.append("skills",form.skills)

            if(resume){
                formdata.append("resume",resume)
            }

            await axios.put(`${import.meta.env.VITE_API_URL}/users/profile`,formdata,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`,
                        "Content-Type":"multipart/form-data"
                    }
                }
            )
            alert("profile updated successfully")
            getprofile()
            setediting(false)
        }catch(err){
            console.log(err);
            
        }
    }
  return (
    <div className='profile-page'>

    <div className='profile-container'>

      <div className='profile-header'>
        <h1>My Profile</h1>
        <p>Manage your personal details and resume.</p>
      </div>

      {editing ? (

        <form onSubmit={handlesubmit} className='profile-form'>

          <div className='input-group'>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handlechange}
              placeholder='Full Name'
            />
          </div>

          <div className='input-group'>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handlechange}
              placeholder='Email'
            />
          </div>

          <div className='input-group'>
            <label>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={form.qualification}
              onChange={handlechange}
              placeholder='Qualification'
            />
          </div>

          <div className='input-group'>
            <label>Experience</label>
            <input
              type="text"
              name="experience"
              value={form.experience}
              onChange={handlechange}
              placeholder='Experience'
            />
          </div>

          <div className='input-group'>
            <label>Skills</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handlechange}
              placeholder='Skills'
            />
          </div>

          <div className='input-group'>
            <label>Upload Resume</label>

            <input
              type="file"
              accept='.pdf'
              onChange={(e) => setresume(e.target.files[0])}
            />
          </div>

          {currentresume && (
            <a
              href={`${import.meta.env.VITE_URL}${currentresume}`}
              target='_blank'
              rel='noreferrer'
              className='resume-link'
            >
              View Current Resume
            </a>
          )}

          <button type='submit' className='btn-update-profile'>
            Update Profile
          </button>

        </form>

      ) : (

        <div className='profile-info'>

          <div className='profile-card'>
            <h2>{form.name}</h2>
            <p>{form.email}</p>
          </div>

          <div className='profile-details'>

            <div className='detail-item'>
              <span>Qualification</span>
              <p>{form.qualification || "Not Added"}</p>
            </div>

            <div className='detail-item'>
              <span>Experience</span>
              <p>{form.experience || "Not Added"}</p>
            </div>

            <div className='detail-item'>
              <span>Skills</span>
              <p>{form.skills || "Not Added"}</p>
            </div>

          </div>

          {currentresume && (
            <a
              href={`${import.meta.env.VITE_URL}${currentresume}`}
              target='_blank'
              rel='noreferrer'
              className='resume-link'
            >
              View Resume
            </a>
          )}

          <button
            onClick={() => setediting(true)}
            className='btn-edit-profile'
          >
            Edit Profile
          </button>

        </div>

      )}

    </div>

  </div>
  )
}

export default Profile

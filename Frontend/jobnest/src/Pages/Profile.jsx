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
    <div>
        <Navbar/>
      <div className='profile-container'>
        <h1>Profile</h1>

        {
            editing ?(
                        <form onSubmit={handlesubmit} className='profile-form'>
            <input 
            type="text"
            name="name"
            value={form.name}
            onChange={handlechange}
            placeholder='Full Name' 
            />
            <input 
            type="text"
            name="email"
            value={form.email}
            onChange={handlechange}
            placeholder='Email' 
            />
            <input 
            type="text"
            name="qualification"
            value={form.qualification}
            onChange={handlechange}
            placeholder='Qualification' 
            />
            <input 
            type="text"
            name="experience"
            value={form.experience}
            onChange={handlechange}
            placeholder='Experience' 
            />
            <input 
            type="text"
            name="skills"
            value={form.skills}
            onChange={handlechange}
            placeholder='Skills' 
            />
            <input 
            type="file"
            accept='.pdf'
            onChange={(e)=>setresume(e.target.files[0])}
            />
            {
                currentresume && (
                    <a href={`${import.meta.env.VITE_URL}${currentresume}`}
                    target='_blank'
                    rel='noreferrer'
                    >
                        View Current Resume
                    </a>
                )
            }
            <button type='submit' className='btn-update-profile'>
                Update Profile
            </button>
        </form>
            ):(
                <div className='profile-info'>
                    <p><span>Name:</span>{form.name}</p>
                    <p><span>Email:</span>{form.email}</p>
                    <p><span>Qualifications:</span>{form.qualification}</p>
                    <p><span>Experience:</span>{form.experience}</p>
                    <p><span>Skills:</span>{form.skills}</p>
                    {
                currentresume && (
                    <a href={`${import.meta.env.VITE_URL}${currentresume}`}
                    target='_blank'
                    rel='noreferrer'
                    >
                        View Resume
                    </a>
                )
            }
                    <button onClick={()=>setediting(true)} className='btn-edit-profile'>
                        Edit Profile
                    </button>
                </div>
            )
        }
      </div>
    </div>
  )
}

export default Profile

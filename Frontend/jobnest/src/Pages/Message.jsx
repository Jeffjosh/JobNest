import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'

function Message() {

    const {id}=useParams()

    const [messages,setmessages]=useState([])
    const [text,settext]=useState("")

    const getmessages=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            const res=await axios.get(`${import.meta.env.VITE_API_URL}/messages/${id}`,
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            setmessages(res.data)

        }catch(err){
            console.log(err);
            
        }
    }

    const sendmessage=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"))

            await axios.post(`${import.meta.env.VITE_API_URL}/messages`,
                {
                    receiver:id,
                    text
                },
                {
                    headers:{
                        Authorization:`Bearer ${user.token}`
                    }
                }
            )
            settext("")
            getmessages()
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        getmessages()
    },[])
  return (
    <div>
        <Navbar/>
      <div>
        <h1>Messages</h1>
        {
            messages.map((msg)=>(
                <div key={msg._id}>
                    <p>{msg.text}</p>
                </div>
            ))
        }
        <input 
        type="text" 
        value={text}
        onChange={(e)=>settext(e.target.value)}
        />
        <button onClick={sendmessage}>Send</button>
      </div>
    </div>
  )
}

export default Message

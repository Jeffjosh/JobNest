import React from 'react'
import { Navigate } from 'react-router-dom'

function Protectroute({children,role}) {
    const user=JSON.parse(localStorage.getItem("user"))

    if(!user){
        return <Navigate to="/login"/>
    }

    if(role && user.user.role !== role){
        return <Navigate to="/"/>
    }
  return children
}

export default Protectroute

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


export default function ProtectedRoute({children,auth}) {
  let navigate = useNavigate();
  
    if(localStorage.getItem('userToken')==null){
       return <Navigate to='/login'/> 
    }

    // if(auth == 'signin'){
    //   if(localStorage.getItem('userToken')){
    //     return Navigate('/')
    //   }
    // }
    
    
  return children
  
}

import React, { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser'

export default function UserInfo() {
    const {userData} = useContext(UserContext);
    console.log(userData);
    
  return (
    <>
<div className="d-flex  align-items-center">
   
    <div className="col-lg-3 pt-3"><img className='profileImage' src={userData.image.secure_url}/></div>
    <div className="col-lg-3 py-5"><h2 className='text-center'>{userData.userName}</h2></div>
            </div>
        
        
    </>
  )
}

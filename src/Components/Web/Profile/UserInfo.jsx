import React, { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser'

export default function UserInfo() {
    const {userData} = useContext(UserContext);
    
  return (
    <>
        <div className="row">
            <div className="col-lg-3"><img className='profileImage' src={userData.image.secure_url}/></div>
            <div className="col-lg-3 py-5"><h2 className=''>{userData.userName}</h2></div>
            
        </div>
        
    </>
  )
}

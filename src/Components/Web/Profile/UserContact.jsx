import React, { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser';

export default function UserContact() {
    const {userData} = useContext(UserContext);
  return (
    <>
        <h3>Email:<span className='text-info'>{userData.email}</span> </h3>
        <h3>Phone:<span className='text-info'>{userData.phone}</span> </h3>
    </>
  )
}

import React, { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser';

export default function UserContact() {
    const {userData} = useContext(UserContext);
    console.log(userData);

  return (
    <>
        <h3>Email:<span className='text-alert'>{userData.email}</span> </h3>
        <h3>Phone:<span className='text-alert'>{userData.phone}</span> </h3>
    </>
  )
}

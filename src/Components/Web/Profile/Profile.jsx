import React, { useContext } from 'react'
import './Profile.css'
import { UserContext } from '../Context/FeatureUser'
import { Link, Outlet, Router } from 'react-router-dom';


export default function Profile() {
    const {userData,loading} = useContext(UserContext);
    if(loading){
        return  <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
                    <span className="loader"></span>
                </div>
    }

  return (
    <>
    <div className="row">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex container flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-5 d-none d-sm-inline">Profile</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item">
                <Link to ='' className="nav-link align-middle px-0">
                <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Info</span>
                </Link>
            </li>
            
            <li>
                <Link to = 'contact' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Contact</span></Link>
            </li>
            
            <li>
                <Link to = 'orders' className="nav-link px-0 align-middle">
                <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">orders</span></Link>
            </li>

            </ul>
            <hr />
            <div className="dropdown pb-4">
            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={userData.image.secure_url} alt="hugenerd" width={30} height={30} className="rounded-circle" />
                <span className="d-none d-sm-inline mx-1">{userData.userName}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li><a className="dropdown-item" href="#">New project...</a></li>
                <li><a className="dropdown-item" href="#">Settings</a></li>
                <li><a className="dropdown-item" href="#">Profile</a></li>
                <li>
                <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
            </div>
        </div>
        </div>
        <div className="col py-3">
        {location.pathname == '/AdminIndex' && <Profile user={user} />}
        </div>
        </div>
    </>
  )
}

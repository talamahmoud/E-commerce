import React from 'react'
import Navbar from '../Components/Dashboard/Navbar/Navbar'
import Footer from '../Components/Dashboard/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

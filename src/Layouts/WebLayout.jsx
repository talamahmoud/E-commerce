import React from 'react'
import Navbar from '../Components/Web/Navbar/Navbar'
import Footer from '../Components/Web/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function WebLayout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

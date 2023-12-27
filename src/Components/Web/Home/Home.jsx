import React, { useState } from 'react'
import Categories from '../Categories/Categories'
import '../Home/Home.css'
export default function Home() {
  
  return (
    <>
    <div className='header'></div>
    <div className="categories p-4">
      <h2 className='text-center cat'>Categories</h2>
      
    <Categories />
    </div>
    </>
  )
}

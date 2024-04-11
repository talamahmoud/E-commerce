import axios from 'axios';
import { useQuery } from 'react-query';
import Swiper from '../Swiper/Swiper';
import { useContext } from 'react';
import { CartContext } from '../Context/FeatureCart';
//import React, { useEffect, useState } from 'react'

export default function Categories() {

  
  const getCategories = async ()=>{
     const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?limit=7`);
     return data.categories;
    }
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    onCategoryChange(categoryName);
  };
  const {data,isLoading} = useQuery('web-category',getCategories);
  const cartContext = useContext(CartContext);
  //console.log(cartContext);

  if(isLoading){
    return <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
    <span className="loader"></span>
</div>


  }


  return (
   
    <div className='container'>
      
      
      <Swiper data = {data}/>
      
    </div>
    
  )
}

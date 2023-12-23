import axios from 'axios';
import { useQuery } from 'react-query';
import Swiper from '../Swiper/Swiper';
import { useContext } from 'react';
import { CartContext } from '../Context/FeatureCart';
//import React, { useEffect, useState } from 'react'

export default function Categories() {
  //const [categories,setCategories] = useState([]);
  //const [isLoading,setIsLoading] = useState(true);
  //const getCategories = async ()=>{
  //  try{
  //    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
  //  console.log(data.categories);
   // setCategories(data.categories);
    
    //}catch(error){
     // console.log(error);
      
    //}
    //finally{
     // setIsLoading(false);
    //}
    
  //}
  //useEffect(()=>{
  // getCategories();
  //},[])

  //if(isLoading){
  //  return <h2>Loading ...</h2>
  //}
  
  const getCategories = async ()=>{
     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`);
     return data.categories;
    }

  const {data,isLoading} = useQuery('web-category',getCategories);
  const cartContext = useContext(CartContext);
  //console.log(cartContext);

  if(isLoading){
    return <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
    <span className="loader"></span>
</div>
  }


  return (
   // <div className='container'>
     // <div className="row">
   //     {categories.map((category)=>
    //      <div className='col-lg-4' key={category._id}>
    //        <h2>{category.name}</h2>
    //        <img src={category.image.secure_url} className='img-fluid'/>
    //      </div>
          
    //    )}
    //  </div>
    //</div>

    <div className='container'>
      {
      /* <div className="row">
        {data?.length ?data?.map((category)=>
          <div className='col-lg-4' key={category._id}>
            <h2>{category.name}</h2>
          </div>
        ):<h2>no cat</h2>}
      </div> */}
      <Swiper data = {data}/>
      
    </div>
    
  )
}

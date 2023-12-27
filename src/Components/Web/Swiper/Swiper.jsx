import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../Swiper/Swiper.css'
import { Link } from 'react-router-dom';
export default function({data}) {
    //console.log(data)
  return (
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      spaceBetween={70}
      slidesPerView={4}
      navigation
      loop = {true}
      autoplay = {{delay:3000}}

      pagination={{ 
        clickable: true 
    }}
     // onSwiper={(swiper) => console.log(swiper)}
      //onSlideChange={() => console.log('slide change')}
    >
      {data?.length ? data.map((category) => (
        <SwiperSlide key={category._id} >
            <Link to={`/products/category/${category._id}`}>
                <div className='category py-5'>
                    <img src={category.image.secure_url} className='img-fluid ' />
                    {/* <h2 className='text-center'>{category.name}</h2> */}
                </div>
           </Link>
        </SwiperSlide>
      )):<h2>no categories</h2>}
    </Swiper>
  
  )
}

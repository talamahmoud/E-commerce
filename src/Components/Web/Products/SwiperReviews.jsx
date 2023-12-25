import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../Swiper/Swiper.css'
export default function({data}) {
    let ratingCount = 0;
    //console.log(data)
  return (
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      spaceBetween={85}
      slidesPerView={3}
      navigation
      loop = {true}
      autoplay = {{delay:3000}}

      pagination={{ 
        clickable: true 
    }}
     // onSwiper={(swiper) => console.log(swiper)}
      //onSlideChange={() => console.log('slide change')}
    >
        <div className="d-flex justify-content-center ">
      {data.reviews.length?data.reviews.map((review)=> (
        <SwiperSlide key={review._id}>
            <div className="text-center">
            <div className="testimonilas-author-thumb">
                    <img className='userReviewer' src={review.createdBy.image.secure_url} alt="girl" />
            </div>
            
            <div className="testimonilas-author-title">
                    <h3>Name: {review.createdBy.userName}</h3>
                    <p>Role: {review.createdBy.role}</p>
            </div>
            
            <div className="testimonilas-para">
                  <p>{review.comment}</p>
                  <p>Rating: {review.rating}</p>
            </div>
            </div>       
           
        </SwiperSlide>
      )):<h2>No Reviews</h2>}
      </div>
    </Swiper>
  
  )
}

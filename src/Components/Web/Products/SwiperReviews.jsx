import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../Swiper/Swiper.css'
export default function({data}) {

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
        <SwiperSlide key={review._id} className='p-5'>
            <div className="text-center card border-3 bg-transparent">
            <div className="testimonilas-author-thumb">
                    <img className='userReviewer' src={review.createdBy.image.secure_url} alt="girl" />
            </div>

            <div className="testimonilas-author-title">
                    <h3>Name: {review.createdBy.userName}</h3>
                    <p>Role: {review.createdBy.role}</p>
            </div>
            
            <div className="testimonilas-para">
                  <p>{review.comment}</p>
                  <p>Rating: 
                  {Array.from({ length: review.rating }, (_, index) => (
                    <svg
                      height="800px"
                      width="800px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 47.94 47.94"
                      xmlSpace="preserve"
                      key={index}
                    >
                      <path
                        fill="#ED8A19"
                        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                      />
                    </svg>
                  ))}  
                  </p>

            </div>
            </div>       
           
        </SwiperSlide>
      )):<h2>No Reviews</h2>}
      
      </div>
    </Swiper>
  
  )
}

import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/FeatureCart';
import { UserContext } from '../Context/FeatureUser';
import './Products.css'
import SwiperReviews from './SwiperReviews';
import ReviewOrders from './ReviewOrders';



export default function Products() {
  let ratCount =0;
  let ratsNum =0;
  let AvgRating = 0;
  const { addToCartContext } = useContext(CartContext);
  const { userToken ,getUserOrdersContext} = useContext(UserContext);
 
  const { productId } = useParams();
  const getProduct = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    //console.log(data.product);
    return data.product;
  };

const avgRat = ()=>{
  data.reviews.map((review)=>{
    ratCount += review.rating;
    ratsNum++;
  })
  AvgRating=ratCount/ratsNum;
    console.log(AvgRating);
  return Math.round(AvgRating);

}
  

  const addToCart = async (productId) => {
    const res = await addToCartContext(productId);
    return res;
  };
  const { data, isLoading } = useQuery("product", getProduct);
  if (isLoading) {
    return (
      <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="container">
      <h1 className="text-center p-4">Product</h1>
      <div className="row justify-content-center align-items-center p-5">
        <div className="col-lg-10">
          <h2 className="text-center">{data.name}</h2>
          <div
            className="img row p-4 justify-content-center align-items-center"
            key={productId}
          >
            {data.subImages.map((img, index) => (
              <div className="col-lg-3" key={index}>
                <img src={img.secure_url} alt="" className="img-fluid" />
              </div>
            ))}
          </div>
          <div className='d-flex justify-content-center'>
            <p>Rating: </p>
            <div className='d-flex gap-1'>
          {Array.from({ length: avgRat() }, (_, index) => (
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
          
            {Array.from({ length: Number(5) - avgRat() }, (_, index) => (
              <svg
                height="200px"
                width="200px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 47.94 47.94"
                xmlSpace="preserve"
                fill="#000000"
                stroke="#000000"
                key={index}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path style={{ fill: '#ffffff' }} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
                </g>
              </svg>
            ))}
            </div>
         
          </div>
          <div className="row justify-content-center pt-3">
            <button
              className="btn btn-outline-success w-25"
              onClick={() => addToCart(data._id)}
              hidden={!userToken}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-center py-4">
        How satisfied are you with our product?
      </h2>
      <ReviewOrders productId={productId} />

      <h2 className="text-center py-5">What Our Customers Say</h2>
      <SwiperReviews data={data} />
    </div>
  );
}

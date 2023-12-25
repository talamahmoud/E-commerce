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
      
      <h2 className='text-center py-4'>How satisfied are you with our product?</h2>

      <ReviewOrders productId = {productId}/>
      <h2 className='text-center py-5'>What Our Customers Say</h2>
      <SwiperReviews data={data}/>
      
    </div>

  );
}

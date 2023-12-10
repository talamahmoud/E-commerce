import React, { useContext } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/FeatureCart';
export default function Products() {
        const {productId} = useParams();
        const {addToCartContext} = useContext(CartContext);
        const getProduct = async ()=>{
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
            //console.log(data.product)
            return data.product;
        }
        const addToCart = async (productId)=>{
            const res = await addToCartContext(productId);
            return res
            
        }
        const {data,isLoading} = useQuery('product' ,getProduct );
        if(isLoading){
            return <div class="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
            <span class="loader"></span>
        </div>
        }
      return (
        <div className="container">
            <h1 className='text-center p-4'>Product</h1>
            <div className="row justify-content-center align-items-center p-5">
                <div className="col-lg-10">
                    <h2 className='text-center'>{data.name}</h2>
                    <div className="img row p-4 justify-content-center align-items-center" key={data._id}>
                    {data.subImages.map((img)=>
                        
                            <div className="col-lg-3">
                                <img src={img.secure_url} alt="" className='img-fluid' />
                            </div>
                            )}
                        </div>
                        <div className="row justify-content-center pt-3">
                            <button className='btn btn-outline-success w-25' onClick={()=>addToCart(data._id)}>Add To Cart</button>
                        </div>
                        
                    
                </div>
            </div>
        </div>
      )
    }
    



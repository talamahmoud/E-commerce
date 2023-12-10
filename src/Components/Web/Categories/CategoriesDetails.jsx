import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategoriesDetails() {
    const {categoryId} = useParams();
    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        console.log(data.products);
        return data.products;
    }
    const {data,isLoading} = useQuery('category-details' , getCategoryDetails);
    if(isLoading){
        return <div class="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
        <span class="loader"></span>
    </div>
    }
  return (
    <div className="container">
        <h1 className='text-center p-4'>Products</h1>
        <div className="row gap-3 justify-content-center  p-5">
        {data.length?data.map((product)=>
            
                <div className="card col-lg-4" style={{width: '18rem'}} key={product._id}>
                    <img src={product.mainImage.secure_url} className="card-img-top img-fluid" />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        {/*<p className="card-text">{product.description}</p> */}
                        <Link to = {`/product/${product._id}`} className="btn btn-primary">Details</Link>
                    </div>
                </div>
            
            
        ):<h2>No Product</h2>}
        </div>
    </div>
  )
}

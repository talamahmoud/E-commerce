//import * as React from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function AllProducts() {
        
        const [currentPage, setCurrentPage] = useState(1);
        const [products, setProduct] = useState([]);
        const [categories,setCategories] = useState([]);
        const [limit,setLimit] = useState(4);
        const [sort,setSort] = useState('');
        const [ltePrice,setLtePrice] = useState(100000);
        const [gtePrice,setGtePrice] = useState(0);
        const [categoryFilter,setCategorFilter] = useState(null);
        

        const fetchProducts = async () => {
          try{
          const { data } = await axios.get(
            `https://ecommerce-node4-five.vercel.app/products?page=${currentPage}&&limit=${limit}&&sort=${sort}
            &&price[gte]=${gtePrice}&&price[lte]=${ltePrice}${categoryFilter?`&categoryId=${categoryFilter}`:''}`);
          //console.log(data);
          setProduct(data);
        }
          catch(error){
            console.log(error);
          }
        };


        const getCategories = async ()=>{
          const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?limit=7`);
          //console.log(data.categories);
          setCategories(data.categories);

         }
        console.log(categories)
    

        const changeLimit = (data)=>{
          setLimit(Number(data));
        }
        const changeSort = (data)=>{
          setSort((data));
        }
        const handleGtePriceChange = (event) => {
          setGtePrice(event.target.value);
        };
        
        const handleLtePriceChange = (event) => {
          setLtePrice(event.target.value);
        };
        const handleGoButtonClick = () => {
          fetchProducts();
        };
        const handleCatFilter = (data) => {
          console.log(data.target.value)
          data.target.value =='all'? setCategorFilter(null):setCategorFilter(data.target.value)
        };
        
        useEffect(() => {
          fetchProducts();
          getCategories();
        }, [currentPage,limit,sort,categoryFilter]);

        let totalPages =Math.ceil(products.total / limit);
        totalPages = isNaN(totalPages) ? 1 : totalPages;
        
        
        return (
          <div>
            <Categories />
            <hr/>
            {/* Display products */}
            <div className="container">
              <h1 className="text-center p-4">Products</h1>
              <div className="d-flex gap-2 justify-content-center">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Limit
                  </button>
                  <ul className="dropdown-menu">
                    {Array.from({ length: products.total }, (_, index) => (
                      <li key={index}>
                        <button
                          className="dropdown-item"
                          onClick={() => changeLimit(`${index + 1}`)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort By
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => changeSort(`name`)}
                      >
                        name
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => changeSort(`price`)}
                      >
                        price
                      </button>
                    </li>

                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => changeSort(`rating`)}
                      >
                        Highest rating
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="dropdown ">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Filter by Price
                  </button>
                  <ul className="dropdown-menu p-4">
                    <form>
                      <div className='text-center'>From: </div>
                        <div className="form-row">
                          <div className="col">
                            <input type="number" className="form-control" placeholder="First Number" onChange={handleGtePriceChange} />
                          </div>
                          <div className='text-center'>to: </div>
                          <div className="col">
                            <input type="number" className="form-control" placeholder="Last Number" onChange={handleLtePriceChange}/>
                          </div>
                        </div>
                        <div className='p-2 text-center'>
                        <button className="btn btn-outline-secondary" type="button"onClick={handleGoButtonClick}>
                          Go
                        </button>
                        </div>
                  </form>
                  </ul>
                </div>
                
                <select className="form-select form-select-sm w-25" aria-label=".form-select-sm example" onChange={handleCatFilter}>
                  
                  <option value={'all'}>Filter By Category (ALL)</option>
                  {
                    categories?.map((category)=>
                      <option key={category._id} value={category._id}>{category.name}</option>
                    )
                  }
                </select>
              </div>
             
              <div className="row gap-3 justify-content-center  p-5">
                {products.products ? (
                  products.products.map((product) => (
                  
                    <div
                      className="card col-lg-4"
                      style={{ width: "18rem" }}
                      key={product._id}
                    >
                     
                      <img
                        src={product.mainImage.secure_url}
                        className="card-img-top img-fluid"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">Price: {product.price}</p>
                        <Link
                          to={`/product/${product._id}`}
                          className="btn btn-details"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <h2>No Product</h2>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Stack spacing={3}>
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  color="secondary"
                  defaultPage={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                />
              </Stack>
            </div>
          </div>
        );
      };

   



                // const changePrice = ()=>{
        //   fetchProducts();
        // }
      


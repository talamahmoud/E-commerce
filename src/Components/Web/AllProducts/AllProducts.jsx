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
        const [limit,setLimit] = useState(4);
        const [sort,setSort] = useState('');
        const [category,setCategory] = useState('');
        const fetchProducts = async () => {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=${limit}&&sort=${sort}`
          );
          //console.log(data);
          setProduct(data);
        };
        const changeLimit = (data)=>{
          setLimit(Number(data));
        }
        const changeSort = (data)=>{
          setSort((data));
        }
        const handleCategoryChange = (selectedCategory) => {
          setCategory(selectedCategory);
        };
        useEffect(() => {
          fetchProducts();
        }, [currentPage,limit,sort]);

        let totalPages =Math.ceil(products.total / limit);
        
        console.log(products);
        console.log(totalPages);
        return (
          <div>
            <Categories/>
            {/* Display products */}
            <div className="container">
              <h1 className="text-center p-4">Products {category}</h1>
              <div className='d-flex gap-2'>
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
                    <li  key={index}>
                      <button className="dropdown-item" onClick={()=>changeLimit(`${index+1}`)}>
                        {index+1}
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
                      <button className="dropdown-item" onClick={()=>changeSort(`name`)}>
                        name
                      </button>
                    </li>

                    <li>
                      <button className="dropdown-item" onClick={()=>changeSort(`price`)}>
                        price
                      </button>
                    </li>

                    <li>
                      <button className="dropdown-item" onClick={()=>changeSort(`rating`)}>
                        Highest rating
                      </button>
                    </li>

                  
                  </ul>
                </div>

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
                        {/*<p className="card-text">{product.description}</p> */}
                        <Link
                          to={`/product/${product._id}`}
                          className="btn btn-primary"
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
      


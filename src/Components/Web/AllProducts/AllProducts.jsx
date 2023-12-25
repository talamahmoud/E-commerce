import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Categories from '../Categories/Categories';

export default function AllProducts() {
    const [currentPage, setCurrentPage] = useState(1);
        const fetchProducts = async (page) => {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}`);
            console.log(data);
          return data.products;
        };
      
        const { data, isLoading } = useQuery(['products', currentPage], () => fetchProducts(currentPage));
      
        if (isLoading) {
          return <div>Loading...</div>;
        }
 
      
        const {  totalPages } = data;
      
        const handlePageChange = (newPage) => {
          setCurrentPage(newPage);
        };
      
        return (
          <div>
           
            <Categories/>
            {/* Display products */}
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
      
            {/* Pagination */}
            {/* <div>
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span> Page {currentPage} of {totalPages} </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div> */}
<div className="d-flex justify-content-center">
<nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </a>
            </li>
            
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
</div>
          </div>
        );
      };
      


import React, { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const {getUserOrdersContext} = useContext(UserContext);
    const getUserOrders =async ()=>{
        const res = await getUserOrdersContext();
        
        return res.orders;
}
    const {data,isLoading} = useQuery('order-content' , getUserOrders);

    if(isLoading){
        return <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
        <span className="loader"></span>
    </div>
    }
    let counter = 0;
    
  return (
    <>
    <h2>My Orders</h2>
    

     <table className="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Address</th>
            <th scope="col">Payment type</th>
            <th scope="col">Created At</th>
            <th scope="col">Status</th>
            <th scope="col">Final price</th>
            <th scope="col">coupon Name</th>
            <th scope="col">Details</th>
            </tr>
        </thead>
        <tbody>
            {data.length?data.map((order)=>
                <React.Fragment key={order._id}>
                <tr>
                    <td>{counter++}</td>
                    <td>{order.address}</td>
                    <td>{order.paymentType}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.status}</td>
                    <td>{order.finalPrice}</td>
                    <td>{order.couponName}</td>
                    <td><Link to = 'orderDetails'></Link></td>
                   
                </tr>
            </React.Fragment>
            ):<h2>No orders</h2>}
   
        </tbody>
        </table>

    
    </>
  )
}

import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../Context/FeatureUser'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useQuery } from 'react-query';


export default function ReviewOrders({productId}) {

    const initialValues={
        comment: '',
        rating: '',
    };
    const onSubmit = async () => {
        const token = localStorage.getItem('userToken');
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/products/${productId}/review`,
                { comment: formik.values.comment, rating: formik.values.rating },
                { headers: { Authorization: `Tariq__${token}` } }
            );
             console.log(data);
            if (data.message == 'success') {
                toast.success(`Reviw Added Successfully`, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });   
            }
            return data;
        } catch (error) {
            console.error(error);
            // Handle the error, show a toast, or perform other actions as needed
        }
    };
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
    })
    const inputs =[
        {
            type : 'text',
            id:'comment',
            name:'comment',
            title:'Comment',
            value:formik.values.comment,
        },
        {
            type : 'number',
            id:'rating',
            name:'rating',
            title:'Rating',
            value:formik.values.rating,
        },
    ]
    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
         name={input.name}
          title={input.title} 
          key={index} 
          errors={formik.errors} 
          onChange={formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            />
     
    )


    const {getUserOrdersContext,userToken} = useContext(UserContext);
    const getUserOrders = async () => {
        try {
          const res = await getUserOrdersContext();
          //console.log(res.orders);
          return res.orders;
        } catch (error) {
          console.error('Error fetching user orders:', error);
          return [];
        }
      };
      const {data,isLoading} = useQuery('get-user-orders' , getUserOrders);
      console.log(data);
    if(isLoading){
        return <div className="loading bg-white position-fixed vh-100 w-100 d-flex justify-content-center align-items-center z-3">
        <span className="loader"></span>
    </div>
    }

    //   let orders=getUserOrders();
    //   console.log(orders);
  return (
    <>
         <form onSubmit={formik.handleSubmit}>
           
         {userToken && (
            <div className='py-5'>
              {renderInputs}
                <div className="d-grid gap-2 pt-4 col-6 mx-auto">
                    <button className="btn btn-success " type="submit">
                        Post Your Review
                    </button>
                </div>
            </div>
        )}

        </form>
    </>
  )
}

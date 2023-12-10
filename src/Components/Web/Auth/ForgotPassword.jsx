import React, { useContext } from 'react'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import { forgotPasswordSchema } from '../Validation/validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
    const initialValues={
        email: '',
        password: '',
        code:'',
    };
    const navigate = useNavigate();
   
    
   
    
    const onSubmit=async users=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);
        if(data.message == 'success'){

            toast.success(`Password Changed Successfully`, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/login')
        }
        

        
    }
    
    
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
        validationSchema:forgotPasswordSchema
    })
    const inputs =[
        {
            type : 'email',
            id:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,
        },
        {
            type : 'password',
            id:'password',
            name:'password',
            title:'User Password',
            value:formik.values.password,
        },
        {
            type : 'text',
            id:'code',
            name:'code',
            title:'Code',
            value:formik.values.code,
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
  return (
    <div className='container'>
        <h2 className='text-center my-4'>Change Password</h2>
        <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" type="submit">Change Password !</button>
            </div>

        </form>
    </div>
  )
}

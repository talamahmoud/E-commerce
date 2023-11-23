import React from 'react'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import { registerScheme } from '../Validation/validation';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function Register() {
    const initialValues={
        userName:'',
        email: '',
        password: '',
    };
    const handleFieldChange = (event)=>{
        formik.setFieldValue('image', event.target.files[0])
    }
    const onSubmit=async users=>{
        const formData = new FormData();
        formData.append('userName', users.userName);
        formData.append('email', users.email);
        formData.append('password', users.password);
        formData.append('image', users.image);
        const {data} = await axios.post('https://ecommerce-node4.vercel.app/auth/signup',formData);
        if(data.message == 'success'){
            formik.resetForm();
            toast.success('account created successfully, plz verify ur email to login', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        console.log(data);
    }
    
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
        validationSchema:registerScheme
    })
    const inputs =[
        {
            type : 'text',
            id:'userName',
            name:'userName',
            title:'User Name',
            value:formik.values.userName,
        },
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
            type:'file',
            id:'image',
            name:'image',
            title:'User Image',
            onChange:handleFieldChange,
        }
    ]
    const renderInputs = inputs.map((input,index)=>
        <Input type={input.type} 
        id={input.id}
         name={input.name}
          title={input.title} 
          key={index} 
          errors={formik.errors} 
          onChange={input.onChange||formik.handleChange}
           onBlur={formik.handleBlur}
            touched={formik.touched}
            />
    )
  return (
    <div className='container'>
        <h2 className='text-center my-4'>Create Account</h2>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
            {renderInputs}
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" type="submit">Create Account</button>
            </div>

        </form>
    </div>
  )
}

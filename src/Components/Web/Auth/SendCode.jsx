import React, { useContext } from 'react'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import { SendCodeSchema } from '../Validation/validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/FeatureUser';


export default function SendCode() {
    const initialValues={
        email: '',
    };
    const navigate = useNavigate();
    let {userToken,setUserToken,userData} = useContext(UserContext);
    
    if(userToken){
        navigate(-1);
    }
    
    const onSubmit=async users=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,users);
        if(data.message == 'success'){
            toast.success(`Code Sent Successfully`, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/forgotPassword')
        }
        
        //console.log(data);
        
    }
    
    
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
        validationSchema:SendCodeSchema
    })
    const inputs =[
        {
            type : 'email',
            id:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,
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
        <h2 className='text-center my-4'>Send Code</h2>
        <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" type="submit">Send</button>
            </div>

        </form>
    </div>
  )
}

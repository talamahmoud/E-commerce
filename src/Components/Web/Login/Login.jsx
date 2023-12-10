import React, { useContext } from 'react'
import Input from '../../Shared/Input'
import { useFormik } from 'formik'
import { loginScheme } from '../Validation/validation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/FeatureUser';


export default function Login() {
    const initialValues={
        email: '',
        password: '',
    };
    const navigate = useNavigate();
    let {userToken,setUserToken,userData} = useContext(UserContext);
    
    if(userToken){
        navigate(-1);
    }
    
    const onSubmit=async users=>{
        const {data} = await axios.post('https://ecommerce-node4.vercel.app/auth/signin',users);
        if(data.message == 'success'){
            localStorage.setItem('userToken' , data.token);
            setUserToken(data.token);
            //saveCurrentUser();
            toast.success(`Welcome`, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            navigate('/')
        }
        
        //console.log(data);
        
    }
    
    
    const formik = useFormik({
        initialValues : initialValues,
        onSubmit,
        validationSchema:loginScheme
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
        <h2 className='text-center my-4'>Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <Link to = '/sendCode'>Forgot Password?</Link>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" type="submit">Sign In</button>
            </div>

        </form>
    </div>
  )
}

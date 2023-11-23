import * as yup from 'yup';
export const registerScheme = yup.object({
    userName:yup.string().required('User Name is required').min(3,'your user name must have at least 3 characters').max(30,'your user name must have at most 30 characters'),
    email:yup.string().required('Email is required').min(6,'your Email must have at least 6 characters').max(30,'your Email must have at most 30 characters'),
    password:yup.string().required('Password is required').min(6,'your Password must have at least 6 characters').max(30,'your Password must have at most 30 characters'),
    
 })
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({children}){

    let [count, setCount] = useState(0);
    const [cart, setCart] = useState(null);
    //console.log(props)
    // let [count,setCount] = useState(0);
    // let [name,setName] = useState('Tala');
    const addToCartContext = async(productId) =>{
        try{
           const token = localStorage.getItem('userToken');
           const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
           {productId},{headers:{Authorization: `Tariq__${token}`}});
           if(data.message == 'success'){
            toast.success('Item added Successfully to cart', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
           }
           setCount(++count);
           return data;
        }
        catch(error){
            console.log(error)
        }
    }
    const getCartContext =async ()=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization: `Tariq__${token}`}});
            setCount(data.count);
            setCart(data.cart);
            return data;
        }
        catch(error){
            console.log(error);
        }  
    }

    const removeFromCartContext = async(productId) =>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            
            {productId},
            {headers:{Authorization: `Tariq__${token}`}});
           if(data.message == 'success'){
            toast.warn('Item Removed', {
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
        
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    return <CartContext.Provider value={{addToCartContext,getCartContext,removeFromCartContext,cart,setCart,count,setCount}}>
        {children}
    </CartContext.Provider>;
}
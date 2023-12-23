import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({children}){

    let [count, setCount] = useState(0);
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartCleared, setCartCleared] = useState(false);
    const [quantity,setQuantity] = useState(0);
    
  
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
           setCount(++count);
           setCart(data);
           setCartItems(data)
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
           setCount(--count);
           setCart(null);
           setCartItems(data.cart)
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const clearCartContext = async ()=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(
                `${import.meta.env.VITE_API_URL}/cart/clear`,
                {},
                {
                  headers: {
                    Authorization: `Tariq__${token}`,
                  },
                }
              );
                setCount(0);
                setCart(null)
                setCartItems([]);
                setCartCleared(true);
                toast.warn('Cart Cleared', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                console.log(data);

                return data;
        }
        catch(error){
            console.log(error);
            setCartCleared(false);
        }

        
    }

    const increaseQuantityContext = async(productId)=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            );
            // {data.cart.products.map((product)=>{
            //     //console.log(product);
            //     if(product.productId == productId){
            //        console.log(setQuantity(++product.quantity));
            //     }
            // })}
            
            return data;
        }
        catch(error){
            console.log(error);
        }
    }

    const decreaseQuantityContext = async(productId)=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            );
            console.log(data);
            setQuantity(--quantity);
            return data;
        }
        catch(error){
            console.log(error);
        }
    }
    const calculateTotalPriceContext = async() => {
       
        
        return getCartContext().reduce((total, product) => total + product.details.price * product.quantity, 0);
      };
    // const createOrderContext = async(phone,address,couponName)=>{
    //     const token = localStorage.getItem('userToken');
    //        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/order`,
    //        {phone,address,couponName},{headers:{Authorization: `Tariq__${token}`}});
    //        return data;
    // }

    return <CartContext.Provider value={{addToCartContext,getCartContext,removeFromCartContext,cart,setCart,count,setCount,clearCartContext,increaseQuantityContext,decreaseQuantityContext,calculateTotalPriceContext}}>
        {children}
    </CartContext.Provider>;
}
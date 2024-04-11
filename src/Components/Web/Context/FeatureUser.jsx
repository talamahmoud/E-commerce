import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export let UserContext = createContext(null);
export default function UserContextProvider ({children}){
    const [userToken,setUserToken] = useState(null);
    let [userData,setUserData] = useState(null);
    const[loading,setLoading] = useState(true);
    const getUserData = async ()=>{
        if(userToken){
            //const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
            const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/user/profile`,
            {headers:{Authorization:`Tariq__${userToken}`}}
            )
            setUserData(data.user);
            setLoading(false);
           // console.log(data);   
        }
    }
    
    useEffect(()=>{
        getUserData();
    },[userToken,userData]);

    const getUserOrdersContext =async()=>{
        if(userToken){
            const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/order`,
            {headers:{Authorization:`Tariq__${userToken}`}}
            )
            
            setLoading(false);
            
            return data;
        }
    }
            
return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,loading,getUserOrdersContext}}>
    {children}
</UserContext.Provider>
}




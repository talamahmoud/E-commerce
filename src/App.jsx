import { RouterProvider} from "react-router-dom";



import { CartContext, CartContextProvider } from "./Components/Web/Context/FeatureCart.jsx";

import {router} from './Layouts/Router.jsx'
import { useContext, useEffect } from "react";
import { UserContext } from "./Components/Web/Context/FeatureUser.jsx";

export default function App() {
let{setUserToken} = useContext(UserContext);
let{getCartContext,setCount,count} = useContext(CartContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!=null){
      setUserToken(localStorage.getItem('userToken'));
      setCount(getCartContext().count);
    }
  },[])

  //const [user,setUser] = useState(null);


  // const saveCurrentUser = ()=>{
  //   const token = localStorage.getItem("userToken");
  //   const decoded = jwtDecode(token);
  //   setUser(decoded);
  // }
// useEffect (()=>{
//   if(localStorage.getItem('userToken')){
//     saveCurrentUser();
//   }
// },[])

  
  return (
  
      
        <RouterProvider router={router} />

    
  )
}

import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import WebLayout from './WebLayout';
import Home from '../Components/Web/Home/Home';
import Categories from '../Components/Web/Categories/Categories';

import CategoriesDashboard from '../Components/Dashboard/CategoriesDashboard/CategoriesDashboard';
import HomeDash from '../Components/Dashboard/Home/Home';
import Register from '../Components/Web/Register/Register';
import Login from '../Components/Web/Login/Login';
import DashboardLayout from './DashboardLayout';
import Cart from '../Components/Web/Cart/Cart';
import CategoriesDetails from '../Components/Web/Categories/CategoriesDetails';
import Products from '../Components/Web/Products/Products';
import ProtectedRoute from '../Components/Web/ProtectedRoute/ProtectedRoute';
import Profile from '../Components/Web/Profile/Profile';
import UserInfo from '../Components/Web/Profile/UserInfo';
import UserContact from '../Components/Web/Profile/UserContact';
import SendCode from '../Components/Web/Auth/SendCode';
import ForgotPassword from '../Components/Web/Auth/ForgotPassword';

export const router = createBrowserRouter([
  {
    path:'/',
    element:<WebLayout />,
    children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:
          //<ProtectedRoute auth='signin'>
            <Login />
          //</ProtectedRoute>
        },
        {
          path:'sendCode',
          element:<SendCode/>
        },
        {
          path:'forgotPassword',
          element:<ForgotPassword/>
        },
        {
         // path:'/',
          index:true,
          element:<Home />
        },
        {
          path:'categories',
          element:<Categories />
        },
        {
          path:'profile',
          element:
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>,
          children:[
            {
              index:true,
              
              element:<UserInfo/>
            },
            {
              path:'contact',
              element:<UserContact/>
            }
          ]
        },
        {
          path:'cart',
          element:
          <ProtectedRoute>
           <Cart />
          </ProtectedRoute>
        },
        {
          path:'products/category/:categoryId',
          element:<CategoriesDetails/>
        },
        {
          path : 'product/:productId',
          element : <Products/>
        },
        {
          path:'*',
          element:<h2>page not found --- web</h2>
        }
    ]
  },
  {
      path:'/dashboard',
      element:<DashboardLayout />,
      children:[{
      path:'home',
      element:<HomeDash />
    }
    ,{
      path:'categories',
      element:<CategoriesDashboard />
    },
    {
      path:'*',
      element:<h2>page not found --- dashboard</h2>
    }
  ]

  }
]);
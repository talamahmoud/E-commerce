import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import WebLayout from './WebLayout';
import Home from '../Components/Web/Home/Home';
import Categories from '../Components/Web/Categories/Categories';
import DashboardLayout from './DashboardLayout';
import CategoriesDashboard from '../Components/Dashboard/CategoriesDashboard/CategoriesDashboard';
import HomeDash from '../Components/Dashboard/Home/Home';
import Register from '../Components/Web/Register/Register';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout/>,
      children:[
        {
          path:'register',
          element:<Register />
        },
        {
          path:'home',
          element: <Home/>
        },
        {
          path: 'categories',
          element: <Categories/>
        },
        {
          path:'*',
          element: <h2>404 Page not found ----- WEB </h2>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <DashboardLayout/>,
      children:[
    {path:'home',
        element:<HomeDash />
      },
      {
        path:"categories",
        element:<CategoriesDashboard/>
      },
      {
        path:'*',
        element: <h2>404 Page not found ----- DASHBOARD </h2>
      }
      ]
      
    }
  ]);
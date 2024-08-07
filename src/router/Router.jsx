import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/Shop/Menu";
import Signup from "../components/Signup";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Login from "../components/Modal";
import LoginUser from "../components/LoginUser";
import Cartpage from "../pages/Shop/Cartpage";
import Dashboardlayout from "../layout/Dashboardlayout";
import Dashboard from "../pages/Dashboard/admin/Dashboard";
import Users from "../pages/Dashboard/admin/Users";
import AddMenu from "../pages/Dashboard/admin/AddMenu";
import MangeMenu from "../pages/Dashboard/admin/MangeMenu";
import PrivateRoute from "../privateRoute/PrivateRoute";
import UpdateMenu from "../pages/Dashboard/admin/UpdateMenu";
import Payment from "../pages/Shop/Payment";
import Order from "../components/Order";
import AdminOrdersComponent from "../pages/Dashboard/admin/AdminOrders";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:"/",
        element: <Home/>
      },
      {
        path:"/menu",
        element:<Menu/>
      },{
        path:'/cart',
        element:<PrivateRoute><Cartpage/></PrivateRoute>
      },
      {
        path: "/update-profile",
        element: <UpdateProfile/>
      },
      {
        path:"/payment",
        element:<Payment/>
      },{
        path:"/order",
        element:<Order/> 
      }
      
    ]
  },
  ,{
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<LoginUser/>
  },{
    path:"/dashboard",
    element:<Dashboardlayout/>,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },{
        path:'users',
        element:<Users/>
      },
      {
        path:'addmenu',
        element:<AddMenu/>
      },
      {
        path:'managemenu',
        element:<MangeMenu/>
      },
      {
        path:'orders',
        element:<AdminOrdersComponent/>
      },{
        path:'update-menu/:id',
        element:<UpdateMenu/>,
        loader:({params})=>fetch(`http://localhost:3000/menu/${params.id}`)
      }
    ]
    } 
  
]);
export default router;
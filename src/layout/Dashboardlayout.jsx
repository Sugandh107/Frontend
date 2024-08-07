import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import logo from "/logo.png";
import { BiSolidDish } from "react-icons/bi";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard /> Home
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping/> Menu</Link>
    </li>
    
  </>
);

function Dashboardlayout() {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start">
          {/* Page content here */}
          
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <div className=" m-10"><Outlet /></div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-52 min-h-full bg-slate-200 text-base-content">
            {/* Sidebar content here */}
            <li className="flex flex-row justify-center items-center">
              <a href="/"><img src={logo} alt="" className=" w-32 m-5" /></a>
              <span className="flex items-center justify-center p-2 bg-cyan-600 text-white hover:bg-cyan-600">
                Admin
              </span>
            </li>
            <li>
              <Link to="/dashboard">
                <MdDashboard />
                <a>Dashboard</a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <FaUsers />
                <h1>All Users</h1>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/addmenu">
                <FaCirclePlus />
                <a>Add Menu</a>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/managemenu">
              <BiSolidDish />  
                <h1>Manage Menu</h1>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/orders">
              <div className=""><MdOutlineRestaurantMenu/></div>
                <h1>Orders</h1>
              </Link>
            </li>

            <hr className="mx-6 my-6 border-t-2 border-gray-300" />
      

      {/* shared nav links */}
      {
          sharedLinks
      }
    
          </ul>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboardlayout;

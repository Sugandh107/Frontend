import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { FaUserAlt } from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";


const Profile = ({ user }) => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("logout success");
        setTimeout((window.location.href = "/"), 2000);
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="User" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-yellow-400 font-bold text-lg text-orange-700">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">
                {" "}
                <FaUserAlt />
                <span className="mx-6">Profile</span>
              </a>
            </li>
            <li>
              <a href="/order">
              <MdRestaurantMenu />
              
              <span className="mx-6">Order</span>
              
              
              </a>
            </li>

            {isAdmin ? (
              <li>
                <a href="/dashboard">
                <MdDashboard />

                <span className="mx-6">Dashboard</span>
                </a>
              </li>
            ) : (
              ""
            )}

            <li>
              <a onClick={handleLogout}>
              <IoLogOut />

              <span className="mx-6">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

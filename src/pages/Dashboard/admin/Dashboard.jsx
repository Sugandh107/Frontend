import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import axios from "axios";
import { GiRupee } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("https://backend-2bj9.onrender.com//adminstat");
        setDetails(res.data);
        // console.log(details.use);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto px-4">
      <h2 className="text-2xl font-semibold my-4">
        Hi, <span className="text-red">{user?.displayName || user?.email}</span>
      </h2>

      <div className="stat stats-horizontal shadow ">
        <div className="stat  ">
          <div className="stat-figure text-secondary text-3xl">
            <GiRupee />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">Rs.{details.revenue}</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat ">
          <div className="stat-figure text-secondary text-3xl">
            <FaUsers />
          </div>
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{details.user}</div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat ">
          <div className="stat-figure text-secondary text-3xl">
            <MdRestaurantMenu />
          </div>
          <div className="stat-title">Menu Items</div>
          <div className="stat-value">{details.menuItems}</div>
          {/* <div className="stat-desc">↗︎ 90 (14%)</div> */}
        </div>
        <div className="stat ">
          <div className="stat-figure text-secondary text-3xl">
            <BiSolidDish />
          </div>
          <div className="stat-title">Orders</div>
          <div className="stat-value">{details.payment}</div>
          <div className="stat-desc">↗︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

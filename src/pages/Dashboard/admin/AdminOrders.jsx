import axios from "axios";
import React, { useState, useEffect } from "react";
import { GiConfirmed } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const AdminOrdersComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchOrders = async () => {
    try {
      const response = await fetch("https://backend-2bj9.onrender.com//payment", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOrders();

  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <motion.div
        className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-600 bg-yellow-100 p-4 font-bold">
      Error fetching data: {error}
    </div>
  );

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleConfirm = async (item) => {
    console.log(item);
    await axios
      .patch(`https://backend-2bj9.onrender.com//payment/${item._id}`)
      .then((res) => {
        console.log(res.data);
        fetchOrders()
        toast.success("Order Confirmed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="container mx-auto p-4 bg-yellow-50 min-h-screen">
      <h2 className="text-3xl font-bold my-6 text-center">
        All <span className="text-red-600">Orders!</span>
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border-2 border-red-400">
          <thead>
            <tr className="bg-red-500 ">
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Order ID</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Email</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Price</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Quantity</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Status</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Items</th>
              <th className="py-3 px-4 border-b-4 border-yellow-400 font-extrabold">Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, index) => (
              <motion.tr 
                key={order._id} 
                className={index % 2 === 0 ? "bg-yellow-50" : "bg-white"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-2 px-4 border-b-2 border-red-200 font-semibold">{order._id}</td>
                <td className="py-2 px-4 border-b-2 border-red-200">{order.email}</td>
                <td className="py-2 px-4 border-b-2 border-red-200 font-bold text-red-600">Rs.{order.price}</td>
                <td className="py-2 px-4 border-b-2 border-red-200">{order.quantity}</td>
                <td className="py-2 px-4 border-b-2 border-red-200">
                  {order.status === "Confirmed" ? (
                    <span className="px-2 py-1 bg-green-500  rounded-full text-sm">Done</span>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleConfirm(order)}
                      className="py-1 px-3 rounded-full text-sm bg-yellow-500 text-white hover:bg-yellow-600 transition duration-300"
                    >
                      <GiConfirmed className="inline mr-1" /> Confirm
                    </motion.button>
                  )}
                </td>
                <td className="py-2 px-4 border-b-2 border-red-200">{order.itemName.join(", ")}</td>
                <td className="py-2 px-4 border-b-2 border-red-200">{new Date(order.createdAt).toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminOrdersComponent;
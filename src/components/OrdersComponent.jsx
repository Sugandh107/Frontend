import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const OrderCard = ({ order, isExpanded, onClick }) => {
  return (
    <motion.div
      layout
      className="bg-white border-2 border-red-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <motion.div className="p-4">
        <h2 className="text-xl font-bold text-red-700">ORDER ID: {order._id}</h2>
        <p className="text-red-600 font-bold mt-2">
          STATUS: <span className={`px-2 py-1 rounded ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
            {order.status.toUpperCase()}
          </span>
        </p>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t-2 border-red-300 p-4"
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <p className="text-red-600 font-bold"><span className="font-extrabold">DATE:</span> {new Date(order.createdAt).toLocaleString()}</p>
              <p className="text-red-600 font-bold"><span className="font-extrabold">PAYMENT ID:</span> {order.transactionId}</p>
              <p className="text-red-600 font-bold"><span className="font-extrabold">ITEMS:</span> {order.itemName.length}</p>
              <p className="text-red-600 font-bold"><span className="font-extrabold">TOTAL PRICE:</span> RS.{order.price}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {order.itemName.map((name, index) => (
                <motion.div
                  key={index}
                  className="item bg-yellow-50 border border-red-200 rounded-lg p-3 hover:shadow-md transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    className="w-full h-32 object-contain rounded mb-2"
                    src={order.itemImage[index]}
                    alt={name}
                  />
                  <p className="text-center font-bold text-red-800 uppercase">{name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const OrdersComponent = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://backend-2bj9.onrender.com/payment", {
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

    fetchOrders();
  }, []);

  const goback = () => {
    window.location.href = "/";
  };

  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, order) => {
      if (order.price) {
        return total + order.price;
      }
      return total;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(orders);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-yellow-100">
      <motion.div
        className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );

  if (error)
    return (
      <motion.div 
        className="text-center text-red-700 p-4 bg-yellow-200 rounded-lg shadow-lg font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ERROR FETCHING DATA: {error.toUpperCase()}
      </motion.div>
    );

  const filteredOrders = orders
    .filter((order) => order.email === email)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (filteredOrders.length !== 0) {
    return (
      <div className="container mx-auto p-4 bg-yellow-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600 uppercase">YOUR ORDERS</h1>
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order._id} 
              order={order} 
              isExpanded={expandedOrderId === order._id}
              onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-yellow-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-5xl font-bold mb-8 text-center uppercase">
          YOUR CART IS <span className="text-red-500">EMPTY</span>
        </h2>
        <motion.button
          onClick={goback}
          className="px-6 py-3 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-colors duration-300 uppercase"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BACK TO MENU
        </motion.button>
      </motion.div>
    );
  }
};

export default OrdersComponent;
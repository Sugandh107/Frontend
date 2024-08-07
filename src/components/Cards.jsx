import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import Usecart from "../hooks/Usecart";

const Cards = ({ item }) => {
  const { name, image, price, _id, recipe } = item;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = Usecart();

  const navigate = useNavigate();


  const handleAdditem = (item) => {
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

      axios.post('https://backend-2bj9.onrender.com//cart', cartItem)
        .then((response) => {
          if (response) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
            refetch();
          }
        })
        .catch((error) => {
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      toast.error('Login to add item  ')
    }
  };

  return (
    
      <div className="card shadow-xl relative mr-5 md:my-5 hover:shadow-2xl transition-shadow duration-300">
        <Link to={`/menu/${item._id}`}>
          <figure className="flex justify-center items-center p-4 transition-transform transform hover:scale-105 duration-300">
            <img
              src={item.image}
              alt={item.name}
              className="hover:scale-105 transition-all duration-300 md:h-48 h-36 object-cover rounded-lg"
            />
          </figure>
        </Link>
        <div className="card-body">
          <Link to={`/menu/${item._id}`}>
            <h2 className="card-title text-lg font-bold mb-2">{item.name}</h2>
          </Link>
          <p className="text-gray-600 text-sm mb-4">{recipe}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className="font-semibold">
              <span className="text-lg text-red">Rs. </span>
              <span className="text-base">{item.price}</span>
            </h5>
            <button
              className=" bg-rose-500 text-white py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-red"
              onClick={() => handleAdditem(item)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default Cards;

import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
const day = date.getDate().toString().padStart(2, '0');
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const seconds = date.getSeconds().toString().padStart(2, '0');

const currentDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

// console.log(currentDateTime);

  // image hosting key
  const image_hosting_key = "2810c7267bf8cca104aafeaf2446befc";
  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key }`;


  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(hostingImg.data)
    
    if (hostingImg.data.success) {
      const menuItem = {
        _id:currentDateTime,
        name: data.name,
        image: hostingImg.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price), 
       
      };

      console.log(menuItem);
      const postMenuItem = axios.post('https://backend-2bj9.onrender.com//menu', menuItem);
      if(postMenuItem){
        reset()
       toast.success("Item Added To Menu")
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

        
          

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-red text-white px-6">
            Add Item <FaUtensils />
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMenu;
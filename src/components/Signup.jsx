import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, signUpWithGmail, updateUserProfile } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password, name, photoURL } = data;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile(name, photoURL)
          .then(() => {
            const userInfo = {
              name: name,
              email: email,
              photoURL:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            };
            axios.post("https://backend-2bj9.onrender.com/user", userInfo)
            .then((response) => {
              // console.log(response);
              toast.success("Account creation successful!");
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            });

          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignUp = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios.post("https://backend-2bj9.onrender.com/user", userInfo)
        .then((response) => {
          // console.log(response);
          toast.success("Account creation successfull");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create An Account!</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered w-80"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-red text-white"
            />
          </div>

          <p className="text-center my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>
        <div className="text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-red hover:text-white"
            onClick={handleGoogleSignUp}
          >
            <FaGoogle />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;

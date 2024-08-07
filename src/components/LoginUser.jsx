import { React, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaFontAwesomeLogoFull,
  FaGithub,
  FaGoogle,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import AuthProvider, { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";

function LoginUser() {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    

  
    const from = location.state?.from?.pathname || "/";

    login(email, password)
      .then((result) => {
      // Signed in
      const user = result.user;
      const userInfor = {
        name: data.name,
        email: data.email,
        
      };
      toast.success("success")
      window.location.href="/"
  })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error("Provide a correct gmail and password!");
      });
  };

  const { signUpWithGmail, login } = useContext(AuthContext);

  const handlelogin = () => {
    signUpWithGmail()
      .then((result) => {
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
          //console.log(response);
          toast.success("Login Success");
          setTimeout(() => {
            window.location.href="/";
          }, 2000);
      })
      .catch((error) => {
        toast.error("Please Provid Valid Email & Password");
      });
  };
  return (
    <div>
      <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
        <div className="modal-action flex flex-col justify-center mt-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-80"
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error */}

            {/* login btn */}
            <div className="form-control mt-6">
              <input
                type="submit"
                value="Login"
                className="btn bg-red text-white"
              />
            </div>

            <p className="text-center my-2">
              Donot have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
              {""}
            </p>

            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>
          </form>

          {/* social sign in */}
          <div className="text-center space-x-3 mb-5">
          Login in with Google 
            <button
              className="btn btn-circle hover:bg-red hover:text-white mx-3"
              onClick={handlelogin}
            >
               <FaGoogle />
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;

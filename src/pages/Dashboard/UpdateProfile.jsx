import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from 'react-router-dom'

function UpdateProfile() {
  const {updateUserProfile,user} = useContext(AuthContext)
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    
    const onSubmit = (data) => {
      const name = data.name;
      const photoURL = data.photoURL;
      updateUserProfile(name, photoURL).then(() => {
          // Profile updated!
          console.log(name,photoURL);
          navigate(from, {replace: true})
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
    }


return (
  <div className='flex items-center justify-center h-screen'>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
      <h3 className='font-bold'> Profile</h3>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Name :{user?.displayName || "User"}</span>
        </label>
       
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text text-lg">Email : {user?.email} </span>
        </label>

       
        
        {/* TODO: Uplodaing image will be later */}
        {/* <input type="file" className="file-input w-full max-w-xs" /> */}
      </div>
      
    </form>
  </div>
  </div>
)
}

export default UpdateProfile
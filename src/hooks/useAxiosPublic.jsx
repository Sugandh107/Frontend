import axios from 'axios'
import React from 'react'


const axiosPublic =  axios.create({
    baseURL: 'https://backend-2bj9.onrender.com',
  })

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;
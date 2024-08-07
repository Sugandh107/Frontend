import React, { useContext, useEffect, useState } from 'react'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import { AuthContext } from '../context/AuthProvider'


function Usecart() {
        const {user}=useContext(AuthContext)
    const { refetch,data:carts=[]} = useQuery({
        queryKey: ['cart',user?.email],
        queryFn: async() =>{
         const res= await fetch(`http://localhost:3000/cart?email=${user?.email}`)
            return res.json()
          }
      })
      console.log(carts);
      
return [carts,refetch]
} 

export default Usecart
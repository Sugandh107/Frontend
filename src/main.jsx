import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
   QueryClient,
   QueryClientProvider,
   useQuery,
 } from '@tanstack/react-query'
 
 const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <QueryClientProvider client={queryClient}>
     <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              />
    <RouterProvider router={router} />
    </QueryClientProvider>
 </AuthProvider>
)

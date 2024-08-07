import { useState } from 'react'

import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
     <h1 className='bg-orange-600 font-primary'>hello </h1>
    </>
  )
}

export default App

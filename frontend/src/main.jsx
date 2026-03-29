import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,Navigate,RouterProvider} from 'react-router-dom'
import SeatsPage from './components/SeatsPage.jsx'
import Payment from './components/Payment.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element:<SeatsPage/>,
  },
  {
    path:'/payment',
    element:<Payment/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

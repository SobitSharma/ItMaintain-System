import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import Authentication from './components/Authentication.jsx'
import MainDashBoard from './components/MainDashBoard.jsx'
import Maintenance from './components/Maintenance.jsx'
import AddItems from './components/Maintenance/AddItems.jsx'
import ListAccessories from './components/Maintenance/ListAccessories.jsx'
import Issuing from './components/Maintenance/Issuing.jsx'
import Trace from './components/Maintenance/Trace.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App/>}>
      <Route path='/' element={<MainDashBoard/>}></Route>
      <Route path='/login' element={<Authentication flag={0}/>}></Route>
      <Route path='/signup' element={<Authentication flag={1}/>}></Route>
      <Route path='/maintenance' element={<Maintenance/>}></Route>
      <Route path='/additems' element={<AddItems/>}></Route>
      <Route path='/list' element={<ListAccessories/>}></Route>
      <Route path='/issuing' element={<Issuing/>}></Route>
      <Route path='/trace' element={<Trace/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

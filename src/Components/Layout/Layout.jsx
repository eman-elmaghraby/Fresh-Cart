
import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout() {
    return (
        <>
          <div className='my-site position-relative'>
          <Navbar/>
          
          <div className='container p-5 m-5'>
          <Outlet/>
          </div>

          <Footer/> 
          </div>
        </>
    )
}

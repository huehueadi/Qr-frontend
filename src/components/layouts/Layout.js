import React from 'react'
import Header from '../master/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../master/Footer'
import Sidelayout from '../master/Sidelayout'

function Layout() {
    return (
  <>
        <Header/>
        <Sidelayout/>
        <div className='main-content'>
        <Outlet/>
        </div>
        <Footer/>
   
    </>
    )
}

export default Layout
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function UserLayout() {
  return (
    <div>
      <Navbar />
      <main>
       
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

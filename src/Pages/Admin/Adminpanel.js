import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../User/Footer';

export default function Adminpanel() {
  return (
    <div>
      <AdminNavbar />
      <main>
        {/* Admin pages like AdminHome, AdminProducts will be rendered here */}
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}


import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Footer from '../User/Footer';

export default function Adminpanel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminNavbar />
      <main style={{ flex: '1 0 auto' }}>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

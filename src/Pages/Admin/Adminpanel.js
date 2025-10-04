import React from 'react';
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./Pages/Admin/AdminNavbar"
import AdminHome from "./Pages/Admin/AdminHome";
import AdminRegister from "./Pages/Admin/AdminRegister";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminOrders from "./Pages/Admin/AdminOrders";

export default function Adminpanel() {
  return (
    <div>
          <AdminNavbar />
        <Routes>
      <Route path="/" element={<AdminHome />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/AdminOrders" element={<AdminOrders />} />
          <Route path="/AdminProducts" element={<AdminProducts />} />
        </Routes>

      <Footer/>
    
    </div>
  )
}

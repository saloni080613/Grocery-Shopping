import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/User/Navbar';
import Home from './Pages/User/Home';
import Cart from './Pages/User/Cart';
import Footer from './Pages/User/Footer';
import AboutUs from './Pages/User/AboutUs';
import Services from './Pages/User/Services';
import Search from './Pages/User/Search';
import Order from './Pages/User/Order';
import SignUp from "./Common/SignUp";
import Login from "./Common/Login";
import Account from "./Common/Account";
// import AdminNavbar from "./Pages/Admin/AdminNavbar"
// import AdminHome from "./Pages/Admin/AdminHome";
// import AdminRegister from "./Pages/Admin/AdminRegister";
// import AdminProducts from "./Pages/Admin/AdminProducts";
// import AdminOrders from "./Pages/Admin/AdminOrders";



function App() {
  return (
 
    
    // <div>

    //    <AdminNavbar />
    //    <Routes>
    //  <Route path="/" element={<AdminHome />} />
    //      <Route path="/AdminRegister" element={<AdminRegister />} />
    //      <Route path="/Account" element={<Account />} />
    //      <Route path="/AdminOrders" element={<AdminOrders />} />
    //      <Route path="/AdminProducts" element={<AdminProducts />} />
    //    </Routes>
    // </div>
  
  <div>
       <Navbar />
        
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Account" element={<Account />} />
          </Routes> 

        <Footer/>
          </div>
          
          
  );
}

export default App;

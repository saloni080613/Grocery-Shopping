import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Navbar from './Pages/User/Navbar';
import Home from './Pages/User/Home';
import Cart from './Pages/User/Cart';
import Wishlist from './Pages/User/Wishlist';
import AboutUs from './Pages/User/AboutUs';
import Services from './Pages/User/Services';
import Search from './Pages/User/Search';
import Checkout from './Pages/User/Checkout';
import OrderTrack from './Pages/User/OrderTrack';
import Order from './Pages/User/Order';
import SignUp from "./Common/SignUp";
import Login from "./Common/Login";
import Footer from './Pages/User/Footer';
import Account from "./Common/Account";
// import AdminNavbar from "./Pages/Admin/AdminNavbar"
// import AdminHome from "./Pages/Admin/AdminHome";
// import AdminRegister from "./Pages/Admin/AdminRegister";
// import AdminProducts from "./Pages/Admin/AdminProducts";
// import AdminOrders from "./Pages/Admin/AdminOrders";



function App() {
  return (
 
    

  
  <div>
    <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000, // Toasts will disappear after 3 seconds
        }}
      />
       <Navbar />
        
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
             <Route path="/checkout" element={<Checkout />} />
            <Route path="/OrderTrack" element={<OrderTrack />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Wishlist" element={<Wishlist />} />
          </Routes> 

        <Footer/>
          </div>
          
          
  );
}

export default App;

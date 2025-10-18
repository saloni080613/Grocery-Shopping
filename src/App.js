import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Common Pages
import SignUp from "./Common/SignUp";
import Login from "./Common/Login";

// Layouts (FIX 1: Added missing UserLayout import)
import UserLayout from "./Pages/User/UserLayout";
import Adminpanel from "./Pages/Admin/Adminpanel";

// User Pages
import Home from "./Pages/User/Home";
import Cart from "./Pages/User/Cart";
import Wishlist from "./Pages/User/Wishlist";
import AboutUs from "./Pages/User/AboutUs";
import Services from "./Pages/User/Services";
import Search from "./Pages/User/Search";
import Checkout from "./Pages/User/Checkout";
import OrderTrack from "./Pages/User/OrderTrack";
import Order from "./Pages/User/Order";
import Account from "./Pages/User/Account";

// Admin Pages
import AdminHome from "./Pages/Admin/AdminHome";
import AdminRegister from "./Pages/Admin/AdminRegister";
import AdminProducts from "./Pages/Admin/AdminProducts";
import AdminOrders from "./Pages/Admin/AdminOrders";
import AdminAddProduct from "./Pages/Admin/AdminAddProduct"; // Import the new component
import AdminEditProduct from "./Pages/Admin/AdminEditProduct";
import AdminAccount from "./Pages/Admin/AdminAccount";

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
      

        {/* --- User Routes --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="ordertrack" element={<OrderTrack />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          <Route path="order" element={<Order />} />
          <Route path="search" element={<Search />} />
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
        </Route>

        {/* --- Admin Routes --- */}
        <Route path="/admin" element={<Adminpanel />}>
          <Route index element={<AdminHome />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products/add" element={<AdminAddProduct />} /> {/* Add the new route */}
          <Route path="products/edit/:productId" element={<AdminEditProduct />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="register" element={<AdminRegister />} />
          <Route path="account" element={<AdminAccount />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
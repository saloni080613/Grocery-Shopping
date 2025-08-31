import './App.css';
import {Routes,Route} from "react-router-dom";
import Navbar from './Pages/User/Navbar';
import Home from './Pages/User/Home';
import Cart from './Pages/User/Cart';
import Login from './Common/Login';
import Search from './Pages/User/Search';
import Order from './Pages/User/Order';
import SignUp from './Common/SignUp';
import Account from './Common/Account';

function App() {
  return (
    <div>
       <Navbar />
        
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Account" element={<Account />} />
          </Routes>
       </div>
  );
}

export default App;

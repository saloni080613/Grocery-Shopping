import './App.css';
import {Routes,Route} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Search from './Components/Search';
import Order from './Components/Order';
import SignUp from './Components/SignUp';
import Account from './Components/Account';

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

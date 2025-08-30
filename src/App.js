import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Cart from './Components/Cart';
import Profile from './Components/Profile';
import Search from './Components/Search';
import {Routes,Route} from "react-router-dom";
import Order from './Components/Order';

function App() {
  return (
    <div>
       

       <Navbar />
        
       <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Search" element={<Search />} />
          </Routes>
       </div>
  );
}

export default App;

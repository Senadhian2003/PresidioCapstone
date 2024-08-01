import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Components/User/Home/Home';
import Products from './Components/User/Products/Products';
import ProductDetail from './Components/User/ProductDetail/ProductDetail';
import Cart from './Components/User/Cart/Cart';
import ActiveOrderHistory from './Components/User/OrderHistory/ActiveOrderHistory';
import OrderHistory from './Components/User/OrderHistory/OrderHistory';
import AdminOrder from './Components/Admin/OrderHistory/AdminActiveOrder';
import AdminOrderHistory from './Components/Admin/OrderHistory/AdminOrderHistory';
import StockMaintenance from './Components/Admin/StockMaintenance/StockMaintenance';
import Login from './Components/User/Authentication/Login';
import Register from './Components/User/Authentication/Register';
import EmployeeLogin from './Components/Admin/Authentication/EmployeeLogin.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeRegister from './Components/Admin/Authentication/EmployeeRegister.jsx';
import AddNewCoffee from './Components/Admin/StockMaintenance/AddNewCoffee.jsx';


function App() {
  return (
    <div className="App">
       <ToastContainer autoClose={2000}/>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ActiveOrderHistory" element={<ActiveOrderHistory />} />
          <Route path="/OrderHistory" element={<OrderHistory />} />
          <Route path="/AdminActiveOrder" element={<AdminOrder />} />
          <Route path="/AdminOrderHistory" element={<AdminOrderHistory />} />
          <Route path="/StockMaintenance" element={<StockMaintenance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
          <Route path="/EmployeeRegister" element={<EmployeeRegister />} />
          <Route path="/AddNewCoffee" element={<AddNewCoffee />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

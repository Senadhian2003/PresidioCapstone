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
function App() {
  return (
    <div className="App">
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
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

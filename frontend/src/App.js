import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import ProductDetail from './Components/ProductDetail/ProductDetail';
function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetail" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;

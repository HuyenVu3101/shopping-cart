import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Product from './Products';
import Reviews from './Reviews';
import Checkout from './Checkout';
import './Main.scss';

function Main() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default Main;

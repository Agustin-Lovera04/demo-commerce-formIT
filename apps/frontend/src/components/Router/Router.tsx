import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CartContainer from "../CartContainer/CartContainer";
import BuyOrderContainer from "../BuyOrderContainer/BuyOrderContainer";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/buyorder" element={<BuyOrderContainer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

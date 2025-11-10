import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CartContainer from "../CartContainer/CartContainer";
import BuyOrderContainer from "../BuyOrderContainer/BuyOrderContainer";
import RegisterContainer from "../RegisterContainer/RegisterContainer";
import LoginContainer from "../LoginContainer/LoginContainer";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterContainer />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/buyorder/:id" element={<BuyOrderContainer />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;

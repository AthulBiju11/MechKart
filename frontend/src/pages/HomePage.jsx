import React, { useEffect } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Hero2 from "../components/Route/Hero2/Hero2";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts.jsx";
import LatestProducts from "../components/Route/LatestProducts/LatestProducts";
import TrendingProd from "../components/Route/TrendCard/TrendingProd";
import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar";
import { useDispatch } from "react-redux";
import { fetchCartFromDatabase } from "../store/cart/cart.reducer";

const HomePage = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  useEffect(()=>{
    const handlerFunction = async () => {
      if(currentUser){
        dispatch(fetchCartFromDatabase(currentUser.id));
      }
    }
    handlerFunction();
    
  },[currentUser])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar active={1} />

      <div className="lex flex-col min-h-screen">
        <Hero />
        <FeaturedProducts />
        <LatestProducts />
        <Hero2 />
        <TrendingProd />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;


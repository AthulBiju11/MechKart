import React from "react";


// import TrendingProd from "../components/Route/TrendCard/TrendingProd";
// import LatestProducts from "../components/Route/LatestProducts/LatestProducts";



import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar";
import CategoriesPage from "../components/Route/categories";
import Categories1 from "../components/Route/categories1";
import Categories2 from "../components/Route/categories2";
import Categories3 from "../components/Route/categories3";

const Products = () => {
 
 

  return (
    <>
     <Navbar active={2} />

      {/* calling cards */}
      <div className="flex flex-col">
        <CategoriesPage />
        <Categories1 />
        <Categories2 />
        <Categories3 />
        <Footer />
        
        
        
      </div>
    </>
  );
};

export default Products;

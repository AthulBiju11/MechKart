import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/mechkartlogo.svg";
import Styles from "../../styles/style";

import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ProductsContext } from "../../context/productContext";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [visible, setVisible] = useState(false);

  const searchRef = useRef(null);

  const {data} = useContext(ProductsContext);
  console.log(data)
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !event.target.classList.contains("search-input")
      ) {
        setVisible(false);
      }
    };
  
    const handleScroll = () => {
      setVisible(false);
    };
  
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    if (searchTerm.trim() === '') {
      setVisible(false);
      setSearchData(null);
    } else {
      setVisible(true);
  
      const filteredProducts =
        data &&
        data.filter((product) =>
          product.title.toLowerCase().includes(searchTerm)
        );
      setSearchData(filteredProducts);
    }
  };
  
  

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`${Styles.section} `}>
        <div className="hidden 800px:mx-[-30px] 800px:my-[20px] 800px:flex justify-between">
          <div className="w-[50px] h-[50px]">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="w-[30%] mr-[750px] relative z-20">
            <input
              type="text"
              placeholder="Search Products.."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#d079f8] border-[2px] rounded-md"
              onClick={() => setVisible(true)}
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {visible && searchData && searchData.length !== 0 ? (
              <div
                className="absolute min-h-[30yh] bg-slate-50 shadow-sm-2 z-[9] p-4 w-[100%]"
                ref={searchRef}
              >
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.title;
                    const Product_name = d.replace(/\s+/g, "-");
                    return (
                      // <Link to={`/product/${Product_name}`} key={index}>
                      <Link to={`/products`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={i.img}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.title}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className="w-[110px] bg-[#682A85] hover:bg-[#983ec2] h-[47px] my-[-5px] flex items-center justify-center rounded-[5px] cursor-pointer">
            <Link to="/login">
              {currentUser ? (
                <div
                  className="text-[#fff] flex items-center"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              ) : (
                <h1 className="ml-4 text-[#fff] flex items-center">
                  Login <IoIosArrowForward className="mr-2 mt-0.5" />
                </h1>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

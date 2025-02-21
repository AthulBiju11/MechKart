import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../../static/data";
import Styles from "../../styles/style";
import DropDown from "./DropDown";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { CartContext } from "../../context/cartContext";
import { useDispatch, useSelector } from "react-redux";
import {selectCartCount} from "../../store/cart/cart.selector.js"
import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";
import { resetCartAction } from "../../store/cart/cart.reducer";

const Navbar = ({ active }) => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [categoriesDropDown, setCategoriesDropDown] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      newRequest.get(`/categories`).then((res) => {
        return res.data;
      }),
  });
  
  useEffect(()=>{
    
  },[currentUser])

  const cartNumber = useSelector(selectCartCount);



  const handleProfileClick = () => {
    setProfileDropDown(!profileDropDown);
  };

  const handleCategoriesClick = () => {
    setCategoriesDropDown(!categoriesDropDown);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      dispatch(resetCartAction());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = () => {
    if(!currentUser){
      toast.error("Sign in to access cart!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }else{
      navigate('/cart')
    }
  }

  return (
    <>
      {/* sub header */}
      <div className="sm:shadow-md mt-[-5px] transition hidden md:flex justify-between w-full bg-[#682A85] h-[70px] sticky top-0 z-10">
        <div className={` ${Styles.noramlFlex} m-8`}>
          {/* sub header (purple box) includes categories, home bestselling etc.. */}

          {/* categories dropdown */}
          <div onClick={handleCategoriesClick}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden lg:block">
              <BiMenuAltLeft size={30} className="absolute top-3.5 left-2" />
              <button className="h-[100%] w-full flex justify-between items-center pl-[50px] bg-[#fff] font-sans text-lg font-[400] select-none rounded-t-md">
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-[21px] cursor-pointer"
                onClick={handleCategoriesClick}
              />
              {/* dropdown logic */}
              {categoriesDropDown && (
                <DropDown
                  categoriesData={data}
                  setDropDown={setCategoriesDropDown}
                />
              )}
            </div>
          </div>
          {/* categories dropdown*/}
        </div>
        <div className="flex m-8">
          {/* Navbar ie, home bestselling etc....*/}
          <div className={`${Styles.noramlFlex} mr-20`}>
            <div className={`block lg:flex`}>
              {navItems &&
                navItems.map((item, index) => (
                  <div className="flex" key={index}>
                    <Link
                      to={item.url}
                      className={`${
                        active === index + 1
                          ? "underline text-[#fefec9]"
                          : "text-black lg:text-[#fff]"
                      } pb-[30px] lg:pb-0 font-[500] px-5 cursor-pointer`}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          {/* navbar */}
          {/* wishlist heart */}
          <div className="flex items-center gap-4">
            {/* <div className={`${Styles.noramlFlex}`}>
              <div className="relative cursor-pointer">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 90%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#ff0b0b] w-[13px] h-[13px] top right p-0 m-0 text-white font-mono text-[9px] leading-tight text-center">
                  0
                </span>
              </div>
            </div> */}

            {/* wishlist heart */}

            {/* Shopping cart */}
            <div>
              <div className={`${Styles.noramlFlex}`}>
                <div className="relative cursor-pointer ">
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 90%)"
                    onClick={handleNavigate}
                  />
                  <span className="absolute left-5 top-0 rounded-full bg-[#ff0b0b] w-[13px] h-[13px] top right p-0 m-0 text-white font-mono text-[9px] leading-tight text-center">
                    {currentUser ? cartNumber : 0}
                  </span>
                </div>
              </div>
            </div>
            {/* ShoppingCart */}

            {/* profile icon */}
            <div className={`${Styles.noramlFlex} relative`}>
              <div className="cursor-pointer" onClick={handleProfileClick}>
                {currentUser?.img ? (
                  <img
                    src={currentUser.img}
                    alt="Profile"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "15px",
                    }}
                  />
                ) : (
                  <CgProfile size={30} color="rgb(255 255 255 / 90%)" />
                )}
              </div>
              {profileDropDown && (
                <div className="absolute top-full mt-2 right-0 w-screen max-w-[200px] bg-white rounded-md shadow-lg divide-y divide-[#682A85] text-gray-800 z-10">
                  {currentUser && <Link
                    to="/profile"
                    className="block py-2 px-4 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>}
                  {currentUser?.isAdmin ? (
                    <Link
                      to="/admin"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Admin
                    </Link>
                  ): (
                    <Link
                      to="/user-request"
                      className="block py-2 px-4 hover:bg-gray-100"
                    >
                      Add Request
                    </Link>
                  )}
                  <div
                    
                    className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
            {/* profile icon */}
          </div>
        </div>
      </div>
      {/* sub header */}
    </>
  );
};

export default Navbar;

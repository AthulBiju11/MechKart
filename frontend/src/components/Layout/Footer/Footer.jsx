import React from "react";
import {useNavigate } from "react-router-dom";

import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import mech from "./mechkart.svg";
import "./Footer.css";

const fut__links = [
  {
    path: "/",
    display: "Laptops & Computers",
  },
  {
    path: "/",
    display: "Cameras & Photography",
  },
  {
    path: "/",
    display: "Smart Phones & Tablets",
  },
  {
    path: "/",
    display: "Video Games & Consoles",
  },
  {
    path: "/",
    display: "Waterproof Headphones",
  },
];

const fut__links2 = [
  {
    path: "/",
    display: "My Account",
  },

  {
    path: "/",
    display: "Discount",
  },

  {
    path: "/",
    display: "Returns",
  },
  {
    path: "/",
    display: "Orders History",
  },
  {
    path: "/",
    display: "Order Tracking",
  },
];

const fut__links3 = [
  {
    path: "/",
    display: "Browse the Shop",
  },
  {
    path: "/",
    display: "Category",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex p-0 mt-10">
        <footer className="footer">
          <div className="cont__footer flex space-x-10 flex-wrap">
            <div className="logo__footer">
              <img src={mech} alt="" />
              <div className="footer__input">
                
                <input type="text" placeholder="Enter Email Address" required />
                
          
            
                <button className="btn text-white" type="submit" onClick={()=>navigate("/Signup")}>
                  Sign Up
                </button>
                
              </div>
              <div className="contact__links flex items-left gap-1 flex-col">
                <span className="flex items-center mt-3 justify-between">
                  Contact info
                </span>
                <span>
                  17 Princess Road, London, Greater London NW1 8JR, UK
                </span>
              </div>
            </div>
            <div className="flex__box flex space-x-9 flex-wrap">
              <div className="">
                <h3 className="font-bold fw-[700] text-xl mb-5">Categories</h3>

                <ul className="footer__quick-link">
                  {fut__links.map((item, index) => (
                    <li key={index} className="_footer__li">
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="">
                <h5 className="font-bold fw-[700] text-xl mb-5">
                  Customer Care
                </h5>

                <ul className="footer__quick-link">
                  {fut__links2.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-2">
                <h5 className="font-bold text-xl mb-5">Pages</h5>
                <ul className="footer__quick-link">
                  {fut__links3.map((item, index) => (
                    <li key={index}>
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </section>
      <section className="p-0 items-center footer__bottom">
        <div>
          <Row>
            <Col lg="3" className="text-center">
              <p className="copyright">©Webecy - All Rights Reserved</p>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Footer;

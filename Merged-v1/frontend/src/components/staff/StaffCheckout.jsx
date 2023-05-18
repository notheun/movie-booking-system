import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
// import StaffNavBar from "./StaffNavbar";
import "./css/staffcheckout.css";

const StaffCheckout = () => {
  const location = useLocation();
  const cart = location?.state?.cart || [];

  return (
    <div>
      <SignedOutNavbar />
      {/* <StaffNavBar /> */}
      <div className="topic">
        <h1>Shopping Cart</h1>
        {/* check if cart has items */}
        {cart.length > 0 ? (
          // render cart items
          cart.map((item, index) => (
            <div key={index}>
              <h3>Item: {item.itemNumber}</h3>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          // render empty cart message
          <p>No items in the cart</p>
        )}
      </div>
      <div className="loginBox">
        <div className="authBottomBox">
          <Link to="/login/staff/checkout/ticketid">
            <button className="mainBtns">Confirm</button>
          </Link>
        </div>
        <br></br>
        <Link to="/login/staff">
          <span className="authBottomText">Return to Main Page</span>
        </Link>
      </div>
    </div>
  );
};

export default StaffCheckout;

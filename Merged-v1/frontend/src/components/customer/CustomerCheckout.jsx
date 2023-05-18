import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
// import CustomerNavbar from "./CustomerNavbar";

export default function CustomerCheckout() {
  const location = useLocation();
  const cart = location?.state?.cart || [];

  return (
    <div>
      <SignedOutNavbar />
      {/* <CustomerNavbar /> */}
      <div className="topic">
        <h1>Shopping Cart</h1>
        <br></br>
        <br></br>
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
          <Link to="/:id/checkout/ticketid">
            <button className="mainBtns">Confirm</button>
          </Link>
        </div>
        <br></br>
        <Link to="/:id">
          <span className="authBottomText">Return to Main Page</span>
        </Link>
      </div>
    </div>
  );
}

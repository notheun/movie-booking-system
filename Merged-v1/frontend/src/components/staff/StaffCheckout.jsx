import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
// import DropNavbar from "./StaffNavbar";
import "./StaffCheckout.css";
export default function StaffCheckout() {
  return (
    <div>
      <SignedOutNavbar />
      {/* <DropNavbar /> */}
      <div className="topic">
        <h1>Shopping Cart</h1>
      </div>
      {/* return everything that was checked out */}
      <div className="loginBox">
        <div className="authBottomBox">
          <Link to="/login/staff">
            <span span className="authBottomText">
              Return to Main Page
            </span>
          </Link>
        </div>
        <Link to="/login/staff/checkout/ticketid">
          <button className="mainBtns">Confirm</button>
        </Link>
      </div>
    </div>
  );
}

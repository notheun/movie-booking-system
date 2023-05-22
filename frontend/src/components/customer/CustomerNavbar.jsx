import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./css/customernavbar.css";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function CustomerNavbar() {
  const customerId = localStorage.getItem("customerId");
  return (
    <>
      <div className="topnav">
        <Link to={`/${customerId}`} className="wordings">
          Movies
        </Link>
        <Link to={`/${customerId}/viewfb`} className="wordings">
          F&B
        </Link>
        <Link to={`/${customerId}/rewards`} className="wordings">
          Redeem Rewards
        </Link>
        <Link to={`/${customerId}/updateprofile`}>
          <button className="mainBtns">
            <PersonAddAltOutlinedIcon />
            Update Profile
          </button>
        </Link>
        <Link to={`/${customerId}/checkout`} className="wordings toLeft">
          <div className="toLeft">
            <ShoppingCartOutlinedIcon />
          </div>
        </Link>
      </div>
    </>
  );
}
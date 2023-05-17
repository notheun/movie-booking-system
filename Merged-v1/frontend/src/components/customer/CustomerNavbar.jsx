import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "./customernavbar.css";
export default function CustomerNavbar() {
  return (
    <>
      <div class="topnav">
        <Link to={"/login/:id"} className="wordings">
          <a href="movies">Movies</a>
        </Link>
        <Link to={"/login/:id/viewfb"} className="wordings">
          <a href="fnb">F&B</a>
        </Link>
        <Link to={"/login/:id/rewards"} className="wordings">
          <a href="redeemrewards">Redeem Rewards</a>
        </Link>
        <Link to={"/login/:id/updateprofile"}>
          <button className="mainBtns">
            <PersonAddAltOutlinedIcon />
            Update Profile
          </button>
        </Link>
        <Link to={"/login/:id/checkout"} className="wordings toLeft">
          <div className="toLeft">
            <ShoppingCartOutlinedIcon />
          </div>
        </Link>
      </div>
    </>
  );
}

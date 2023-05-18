import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./css/customernavbar.css";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function CustomerNavbar() {
  return (
    <>
      <div class="topnav">
        <Link to={"/:id"} className="wordings">
          Movies
        </Link>
        <Link to={"/:id/viewfb"} className="wordings">
          F&B
        </Link>
        <Link to={"/:id/rewards"} className="wordings">
          Redeem Rewards
        </Link>
        <Link to={"/:id/updateprofile"}>
          <button className="mainBtns">
            <PersonAddAltOutlinedIcon />
            Update Profile
          </button>
        </Link>
        <Link to={"/:id/checkout"} className="wordings toLeft">
          <div className="toLeft">
            <ShoppingCartOutlinedIcon />
          </div>
        </Link>
      </div>
    </>
  );
}

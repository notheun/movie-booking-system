import React from "react";
import "./css/staffnavbar.css";
import { Link } from "react-router-dom";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export default function StaffNavbar() {
  return (
    <>
      <div className="topnav">
        <Link to={"/login/staff"} className="wordings">
          Movies
        </Link>
        <Link to={"/login/staff/checkloyaltypoints"} className="wordings">
          View Loyalty Points
        </Link>
        <Link to={"/login/staff/viewfb"} className="wordings">
          F&B
        </Link>
        <Link to={"/login/staff/checkticket"} className="wordings">
          Check Ticket
        </Link>
        <Link to={"/login/staff/checkout"} className="wordings toLeft">
          <div>{<ShoppingCartOutlinedIcon />}</div>
        </Link>
      </div>
    </>
  );
}
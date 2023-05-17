import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
//DropNavbar
export default function DropNavbar() {
  return (
    <>
      <div class="topnav">
        <Link to={"/login/staff"} className="wordings">
          <a href="#movies">Movies</a>
        </Link>
        <Link to={"/login/staff/checkloyaltypoints"} className="wordings">
          <a href="#loyaltyPoints">View Loyalty Points</a>
        </Link>
        <Link to={"/login/staff/viewfb"} className="wordings">
          <a href="#fnb">F&B</a>
        </Link>
        <Link to={"/login/staff/checkticket"} className="wordings">
          <a href="#ticket">Check Ticket</a>
        </Link>
        <Link to={"/login/staff/checkout"} className="wordings toLeft">
          <div>{<ShoppingCartOutlinedIcon />}</div>
        </Link>
      </div>
    </>
  );
}

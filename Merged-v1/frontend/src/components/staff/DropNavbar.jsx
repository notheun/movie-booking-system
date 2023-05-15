import React from "react";
import "./DropNavbar.css";
import { Link } from "react-router-dom";

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
      </div>
    </>
  );
}

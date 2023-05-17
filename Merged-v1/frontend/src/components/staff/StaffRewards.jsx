import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
import DropNavbar from "./StaffNavbar";

export default function StaffRewards() {
  //Function to get the data of movies
  const addToCart = () => {
    return;
  };

  return (
    <div>
      <SignedOutNavbar />
      <DropNavbar />
      <div className="topic">
        <h1>Rewards</h1>
      </div>
      <button className="mainBtns" onClick={addToCart}>
        Redeem
      </button>
    </div>
  );
}

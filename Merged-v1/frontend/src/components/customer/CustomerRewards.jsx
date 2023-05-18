import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";

export default function CustomerRewards() {
  const redeem = () => {
    return;
  };
  return (
    <div>
      <SignedOutNavbar />
      <CustomerNavbar />
      <div className="topic">
        <h1>Rewards</h1>
      </div>
      <button className="mainBtns" onClick={redeem}>
        Add To cart
      </button>
    </div>
  );
}

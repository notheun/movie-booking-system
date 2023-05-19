import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
import StaffNavBar from "./StaffNavbar";

export default function StaffRewards() {
  const [rewardpoints, setRewardPoints] = useState(0);
  const redeem = () => {
    return;
  };
  const addToCart = () => {
    return;
  };

  return (
    <div>
      <SignedOutNavbar />
      <StaffNavBar />
      <div className="topic">
        <h1>Rewards</h1>
        <div className="wordings toLeft">
          Rewards Points Available: {rewardpoints}
        </div>
      </div>
      <div className="alignRewards">
        <div className="rewardBox">
          <img
            width={"250px"}
            src="/images/1freeMovieTicket.png"
            alt="rewards1"
            draggable={"false"}
          />
          <h3>50 Points</h3>
          <button className="mainBtns" onClick={redeem}>
            Redeem
          </button>
        </div>
        <div className="rewardBox">
          <img
            width={"250px"}
            src="/images/1freeLargePopcorn.png"
            alt="rewards2"
            draggable={"false"}
          />
          <h3>30 Points</h3>
          <button className="mainBtns" onClick={redeem}>
            Redeem
          </button>
        </div>
        <div className="rewardBox">
          <img
            width={"250px"}
            src="/images/1freeSoftdrink.png"
            alt="rewards3"
            draggable={"false"}
          />
          <h3>10 Points</h3>
          <button className="mainBtns" onClick={redeem}>
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
}

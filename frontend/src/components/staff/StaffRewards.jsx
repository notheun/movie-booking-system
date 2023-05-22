import React, { useEffect, useState } from "react";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavbar from "./StaffNavbar";

import RewardService from "../../services/RewardService";
import UserService from "../../services/UserService";

import "../customer/css/customerrewards.css";

const CustomerRewards = () => {
    const [rewardpoints, setRewardPoints] = useState(0);
    const [rewards, setRewards] = useState([]);

    // state for re-rendering loyalty points after redemption
    const [isRedeemed, setIsRedeemed] = useState(false);

    const customerId = localStorage.getItem("customerId");

    useEffect(() => {
        getExistingPoints();
        getRewards();
        setIsRedeemed(false);
    }, [isRedeemed]);

    const getExistingPoints = () => {
        UserService.getUserById(customerId)
            .then((res) => {
                setRewardPoints(res.data.loyaltyPoints);
                // console.log(rewardpoints);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const getRewards = () => {
        RewardService.viewReward()
            .then((res) => {
                setRewards(res.data);
                // console.log(rewards);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const redeem = (reward) => {
        const rewardDetails = {
            userId: customerId,
            rewardId: reward.id,
        }

        RewardService.claimReward(rewardDetails)
            .then((res) => {
                alert("Reward redeemed successfully");
                setIsRedeemed(true);
            })
            .catch((e) => {
                alert("Insufficient points");
            })
    };

    return (
        <div>
            <SignedOutNavbar />
            <StaffNavbar />
            <div className="topic">
                <h1>Rewards</h1>
                <div className="wordings toLeft">
                    Rewards Points Available: {rewardpoints}
                </div>
            </div>
            <div className="alignRewards">
            {rewards.map((reward) => (
                <div className="rewardBox" key={reward.id}>
                    <img
                        width={"250px"}
                        src={reward.poster} 
                        alt={reward.description}
                        draggable={"false"}
                    />
                    <h3>{reward.points} Points</h3>
                    <button className="mainBtns" onClick={() => redeem(reward)}>
                        Redeem
                    </button>
                </div>
            ))}
            </div>
        </div>
    );
}

export default CustomerRewards;
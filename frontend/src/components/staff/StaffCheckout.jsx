import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CartService from "../../services/CartService";
import TicketService from "../../services/TicketService";
import RewardService from "../../services/RewardService";
import FoodDrinkService from "../../services/FoodDrinkService";

import "../admin/user.css";
import StaffNavbar from "./StaffNavbar";
import "../staff/css/staffcheckout.css";

const StaffCheckout = () => {

    const [cart, setCart] = useState({});

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await CartService.getCart("staff");
                console.log(response.data);
                setCart(response.data);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, ["staff"]);

    const navigate = useNavigate();

    const [itemDetails, setItemDetails] = useState([]);

    useEffect(() => {
        const fetchTicketDetails = async () => {
            try {
                const details = await Promise.all(
                    cart.ticketIds.map(async (ticketId) => {
                        const response = await TicketService.findTicketById(ticketId);
                        console.log(response.data);
                        return response.data;
                    })
                );
                setItemDetails((prevDetails) => [...prevDetails, ...details]);
            } catch (error) {
                console.error("Error fetching ticket details:", error);
            }
        };

        const fetchFoodDrinkDetails = async () => {
            try {
                const details = await Promise.all(
                    cart.foodDrinkIds.map(async (foodDrinkId) => {
                        const response = await FoodDrinkService.findFoodDrinksById(foodDrinkId);
                        console.log(response.data);
                        return response.data;
                    })
                );
                setItemDetails((prevDetails) => [...prevDetails, ...details]);
            } catch (error) {
                console.error("Error fetching food & drink details:", error);
            }
        };

        const fetchRewardDetails = async () => {
            try {
                const details = await Promise.all(
                    cart.rewardIds.map(async (rewardId) => {
                        const response = await RewardService.findRewardsById(rewardId);
                        console.log(response.data);
                        return response.data;
                    })
                );
                setItemDetails((prevDetails) => [...prevDetails, ...details]);
            } catch (error) {
                console.error("Error fetching reward details:", error);
            }
        };

        if (cart.ticketIds && cart.ticketIds.length > 0) {
            fetchTicketDetails();
        }

        if (cart.foodDrinkIds && cart.foodDrinkIds.length > 0) {
            fetchFoodDrinkDetails();
        }

        if (cart.rewardIds && cart.rewardIds.length > 0) {
            fetchRewardDetails();
        }
    }, [cart]);

    const checkout = async (cartDetails) => {
        try {
            const cartDetails = {
                ...cart,
                isCheckedOut: true,
                ticketIds: [],
                foodDrinkIds: [],
                rewardIds: [],
            };
            console.log("Updated Cart:", cartDetails);
            await CartService.updateCart(cartDetails);
            console.log("Cart updated successfully");
            setCart(cartDetails);
            navigate(`/login/staff/checkout/ticketid`);
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    return (
        <div>
            <SignedOutNavbar />
            <div className="topic">
                <h1>Shopping Cart</h1>
            </div>

            <div className="loginBox">
                {Object.keys(cart).length > 0 ? (
                    <ul>
                        <li key={cart.id}>
                            {cart.ticketIds && cart.ticketIds.length > 0 && (
                                <ul>
                                    <li>
                                        Ticket IDs: {cart.ticketIds.join(", ")}
                                    </li>
                                    {itemDetails.map((item, index) => {
                                        if (cart.ticketIds.includes(item.id)) {
                                            return (
                                                <li key={index}>
                                                    Ticket Details:
                                                    <ul>
                                                        <li>Ticket Name: {item.seatNumber}</li>
                                                        <li>Ticket Price: {item.price}</li>
                                                    </ul>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            )}
                            {cart.foodDrinkIds && cart.foodDrinkIds.length > 0 && (
                                <ul>
                                    <li>
                                        Food & Drink IDs: {cart.foodDrinkIds.join(", ")}
                                    </li>
                                    {itemDetails.map((item, index) => {
                                        if (cart.foodDrinkIds.includes(item.id)) {
                                            return (
                                                <li key={index}>
                                                    Food & Drink Details:
                                                    <ul>
                                                        {/*<li><img src={item.poster}></img></li>*/}
                                                        <li>Food & Drink Name: {item.description}</li>
                                                        <li>Food & Drink Price: {item.price}</li>
                                                    </ul>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            )}
                            {cart.rewardIds && cart.rewardIds.length > 0 && (
                                <ul>
                                    {itemDetails.map((item, index) => {
                                        if (cart.rewardIds.includes(item.id)) {
                                            return (
                                                <li key={index}>
                                                    Reward Details:
                                                    <ul>
                                                        {/*<li><img src={item.poster}></img></li>*/}
                                                        <li>Reward Name: {item.description}</li>
                                                        <li>Reward Points: {item.points}</li>
                                                    </ul>
                                                </li>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            )}
                        </li>
                    </ul>
                ) : (
                    <p>No items in the cart.</p>
                )}

                <div className="authBottomBox">
                    <span className="authBottomText" onClick={() => navigate(-1)}>
                        Return to Main Page
                    </span>
                </div>
                {Object.keys(cart).length > 0 && (
                    <button className="mainBtns" onClick={checkout}>
                        Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default StaffCheckout;

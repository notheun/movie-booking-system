import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../admin/user.css";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavbar from "./StaffNavbar";
import FoodDrinkService from '../../services/FoodDrinkService';
import CartService from "../../services/CartService";

const StaffFoodBev = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItem();
    }, []);

    const getItem = () => {
        FoodDrinkService.viewFoodDrinks()
        .then((res) => {
            setItems(res.data);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const addToCart = (item) => {
        const cartDetails = {
            userId: "staff",
            ticketIds: [],
            foodDrinkIds: [item],
            rewardIds: [],
            isCheckedOut: false,
        }

        CartService.updateCart(cartDetails)
            .then((res) => {
                console.log(cartDetails);
                alert(`Item successfully added to cart`);
            })
            .catch((e) => {
                console.log(`Cart error: ${e}`)
            })
    };

    return (
        <div>
            <SignedOutNavbar />
            <StaffNavbar />
            <div className="topic">
                <h1>F&B</h1>
            </div>
            {items.map((item, index) => (
                <div key={index}>
                    <img src={item.poster} alt={`${item.description}`} />
                    <h3>Item: {item.itemNumber}</h3>
                    <p>Description: {item.description}</p>
                    <p>Price: ${item.price}</p>
                    <button className="mainBtns" onClick={() => addToCart(item.id)}>
                        Add To cart
                    </button>
                </div>
            ))}
        </div>
    );
}

export default StaffFoodBev;

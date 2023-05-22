import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../admin/user.css";
import "./css/CustomerFoodBev.css";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";
import FoodDrinkService from "../../services/FoodDrinkService";
import CartService from "../../services/CartService";

const CustomerFoodBev = () => {
  const [items, setItems] = useState([]);
  const customerId = localStorage.getItem("customerId");

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
      userId: customerId,
      ticketIds: [],
      foodDrinkIds: [item],
      rewardIds: [],
      isCheckedOut: false,
    };

    CartService.updateCart(cartDetails)
      .then((res) => {
        console.log(cartDetails);
        alert(`Item ${item.itemNumber} successfully added to cart`);
      })
      .catch((e) => {
        console.log(`Cart error: ${e}`);
      });
  };

  return (
    <div>
      <SignedOutNavbar />
      <CustomerNavbar />
      <div className="topic">
        <h1>F&B</h1>
      </div>
      <div className="alignFb">
        {items.map((item, index) => (
          <div className="fbBox">
            <div className="movieCard" key={index}>
              <img
                src={item.poster}
                alt={`${item.description}`}
                width={"250px"}
                height={"280px"}
              />
              <div className="cardInfo">
                <h3>Item: {item.itemNumber}</h3>
                <div className="cardList">
                  <p>Description: {item.description}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>

              <button className="mainBtns" onClick={() => addToCart(item.id)}>
                Add To cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerFoodBev;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../admin/user.css";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";
import FoodDrinkService from "../../services/FoodDrinkService";

export default function CustomerFoodBev() {
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

  const addToCart = () => {
    return;
  };

  return (
    <div>
      <SignedOutNavbar />
      <CustomerNavbar />
      <div className="topic">
        <h1>F&B</h1>
      </div>
      {items.map((item, index) => (
        <div key={index}>
          <img src={item.poster} alt={`${item.description}`} />
          <h3>Item: {item.itemNumber}</h3>
          <p>Description: {item.description}</p>
          <p>Price: ${item.price}</p>
          <button className="mainBtns" onClick={addToCart}>
            Add To cart
          </button>
        </div>
      ))}
    </div>
  );
}

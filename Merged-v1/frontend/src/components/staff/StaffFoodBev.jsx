import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../admin/user.css";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavBar from "./StaffNavbar";
import FoodDrinkService from "../../services/FoodDrinkService";

const StaffFoodBev = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

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
    console.log("Adding item to cart:", item);
    setCart((prev) => [...prev, item]);
  };

  const goToCart = () => {
    navigate("/login/staff/checkout", { state: { cart: cart } });
  };

  return (
    <div>
      <SignedOutNavbar />
      <StaffNavBar />
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
              <button className="mainBtns" onClick={() => addToCart(item)}>
                Add To cart
              </button>
            </div>
          </div>
        ))}
        {/*this is temporary, still deciding if i need a backend to save cart items
                or to look for other alternatives*/}
        {cart.length > 0 && (
          <button className="mainBtns" onClick={goToCart}>
            Go to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default StaffFoodBev;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import FoodDrinksService from "../../services/FoodDrinkService";
import UploadImage from "../image/UploadImage";
import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

const ManageFoodDrinks = () => {
  const [foodDrinks, setFoodDrinks] = useState([]);

  useEffect(() => {
    fetchFoodDrinks();
  });

  const fetchFoodDrinks = () => {
    FoodDrinksService.viewFoodDrinks()
      .then((res) => {
        setFoodDrinks(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //Function to delete fb
  const deleteFB = () => {
    return;
  };
  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />

      <div className="loginHeader">
        <h3>Food and Drinks</h3>
      </div>
      <ul>
        {foodDrinks.map((item) => {
          <li key={item.id}>
            <p>Item Number: {item.itemNumber}</p>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <img src={item.poster} alt="Item Poster" />
          </li>;
        })}
      </ul>
      <button className="mainBtns" onClick={deleteFB}>
        Delete
      </button>
    </div>
  );
};

export default ManageFoodDrinks;

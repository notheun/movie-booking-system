import React, { useState, useEffect } from "react";
import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import FoodDrinkService from "../../services/FoodDrinkService";
import ImageService from "../../services/ImageService";
import "./css/ManageFoodDrinks.css";
const ManageFoodDrinks = () => {
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

  const deleteItem = (itemNumber) => {
    FoodDrinkService.deleteFoodDrinks(itemNumber)
      .then(() => {
        alert(`Food and drinks item ${itemNumber} deleted successfully`);
        getItem();
        // delete the image file from the server
        const imageURL = items.find(
          (item) => item.itemNumber === itemNumber
        ).poster;
        if (imageURL) {
          const filename = imageURL.split("/").pop();
          ImageService.delete(filename)
            .then(() => {
              console.log("Image deleted successfully");
              // re-render new list
              getItem();
            })
            .catch((error) => {
              console.log("Failed to delete image:", error);
            });
        } else {
          console.log("No image associated with the item.");
          // re-render new list
          getItem();
        }
      })
      .catch((error) => {
        alert("Failed to delete food and drinks item:", error);
      });
  };

  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Edit F&B</h1>
        {/* <div className="alignFb"> */}
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
              <button
                className="mainBtns"
                onClick={() => deleteItem(item.itemNumber)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default ManageFoodDrinks;

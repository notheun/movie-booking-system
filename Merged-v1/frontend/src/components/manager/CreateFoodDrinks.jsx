import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import FoodDrinksService from "../../services/FoodDrinkService";
import UploadImage from "../image/UploadImage";

// import { ObjectId } from "bson";

const CreateFoodDrinks = () => {
  // export default function CreateFoodDrinks() {
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const [item, setItem] = useState({
    id: null,
    itemNumber: "",
    description: "",
    price: "",
    poster: null,
  });

  const [image, setImage] = useState(null);

  const handleChangeInput = (e) => {
    const name = e.target.name; // name here means the name of the input field
    const value = e.target.value; // value of that input field

    setItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageUpload = (imageName) => {
    setImage(imageName);
  };

  const isEmpty = () => {
    if (item.itemNumber === "" || item.description === "" || item.price === "")
      return true;
    else return false;
  };

  const saveItem = () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    if (isEmpty()) {
      alert("Please fill in all the details");
      return;
    }

    const imageURL = "http://localhost:8080/api/image/files/" + image;

    const foodDrinksDetails = {
      itemNumber: item.itemNumber,
      description: item.description,
      price: item.price,
      poster: imageURL,
    };

    FoodDrinksService.createFoodDrinks(foodDrinksDetails)
      .then((res) => {
        setIsCreated(true);
        console.log(res.data);
        alert("Item created successfully");
        navigate("/login/manager");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   FoodDrinksService.createFoodDrinks(foodDrinksDetails)
  //     .then((res) => {
  //       setIsCreated(true);
  //       console.log(res.data);
  //       const stringid = item.id;
  //       const objId = new ObjectId(stringid);
  //       console.log(objId);
  //       alert("Item created successfully");
  //       navigate("/login/manager");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="loginBox">
        <div className="loginHeader">
          <h3>Create Item</h3>
          <div className="loginHeaderInnerBox">
            <img
              width={"45px"}
              src="/images/logo.png"
              alt="logo"
              draggable={"false"}
            />
            <h3>
              <span className="appName_loginModal">Film</span> Production
            </h3>
          </div>
        </div>
        <UploadImage onImageUpload={handleImageUpload} />
        <div className="loginForm">
          <input
            required
            placeholder="Item Number"
            autoComplete="false"
            type="text"
            onChange={handleChangeInput}
            name="itemNumber"
            id=""
          />
          <input
            required
            placeholder="Description"
            autoComplete="false"
            type="text"
            onChange={handleChangeInput}
            name="description"
            id=""
          />
          <input
            required
            placeholder="Price"
            autoComplete="false"
            onChange={handleChangeInput}
            type="text"
            name="price"
            id=""
          />

          <button className="mainBtns" onClick={saveItem}>
            Create Item
          </button>
          <Link to="/login/manager">
            <button className="mainBtns">Return</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateFoodDrinks;

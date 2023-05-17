import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FoodDrinksService from "../../services/FoodDrinkService";
import UploadImage from "../image/UploadImage";

const CreateFoodDrinks = () => {
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

  /*
  // Handle image upload
  const handleImageUpload = async (file) => {
    // Send the file to the backend
    const formData = new FormData();
    formData.append("file", file);
  
    try {
        const response = await FoodDrinksService.uploadImage(formData);
        const imageUrl = response.data; 
        setItem((prev) => ({
          ...prev,
          poster: imageUrl,
        }));
      } catch (error) {
          console.log(error);
          // Handle error
      }
  };
  */

  const handleImageUpload = (imageName) => {
    setImage(imageName);
  };

  const saveItem = () => {
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

  return (
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
  );
};

export default CreateFoodDrinks;

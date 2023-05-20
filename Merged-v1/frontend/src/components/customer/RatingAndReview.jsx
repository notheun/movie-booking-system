import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";
import "../customer/css/CustomerRewards.css";
import "../customer/css/RatingAndReview.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import PostReview from "./PostReview";

export default function RatingAndReview() {
  const [value, setValue] = useState(0);
  const [addReview, setAddReview] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [ratings, setRatings] = useState([]);
  const writtenNote = (event) => {
    setUserInput(event.target.value);
  };
  const addToReviews = () => {
    let newToDo = { id: Date.now(), review: userInput, value: value };
    setAddReview((prev) => {
      return [...prev, newToDo];
    });
    setUserInput("");
  };
  const saveRates = (event) => {
    setRatings(event.target.value);
  };
  return (
    <>
      <SignedOutNavbar />
      <CustomerNavbar />
      <div className="topic">
        <h1>Reviews: </h1>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Ratings</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue, saveRates) => {
              setValue(newValue);
            }}
          />
        </Box>
        <textarea
          className="loginBox"
          placeholder="What's your feedback?"
          onChange={writtenNote}
          value={userInput}
        />
        <button className="mainBtns" onClick={addToReviews}>
          Submit
        </button>
        {addReview.map((data) => {
          return <PostReview review={data} key={data.id} value={data.value} />;
        })}
      </div>
    </>
  );
}

import React from "react";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import "./css/RatingAndReview.css";

const PostReview = ({ review }) => {
  //need a method to get username so that when post with review, it shows
  //   const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <div className="loginBox">
        <div className="listRating">
          {/* <h3>{username}</h3> */}
          <p>{review.review}</p>
          <Rating value={review.value} name="simple-controlled" />
        </div>
      </div>
    </>
  );
};

export default PostReview;

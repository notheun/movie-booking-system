import React from "react";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";

const PostReview = ({ review }) => {
  //need a method to get username so that when post with review, it shows
  //   const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <div className="loginBox">
        {/* <h3>{username}</h3> */}
        <p>{review.review}</p>
        <Rating value={review.value} name="simple-controlled" />
      </div>
    </>
  );
};

export default PostReview;

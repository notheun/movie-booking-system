import React from "react";

const Header = ({ project }) => {
  return (
    <>
      <h1>
        {" "}
        <span style={{ color: "lightblue" }}> ReactJS project: </span> {project}{" "}
      </h1>
    </>
  );
};

export default Header;

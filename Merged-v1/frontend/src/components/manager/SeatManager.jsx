import React, { useState, useEffect } from "react";

import "./css/seats.css";

export default function SeatManager(props) {

  const [room, setRoom] = useState({
    roomNumber: "",
    numRows: "10",
    numCols: "10",
  });

  useEffect(() => {
    if (props.onChange) {
      props.onChange(room);
    }
  }, [room, props.onChange]);

  function handleChange(e) {
    const { name, value } = e.target;
  
    setRoom((prevRoom) => {
      if (name === "numRows") {
        return {
          ...prevRoom,
          numRows: parseInt(value),
        };
      } else if (name === "numCols") {
        return {
          ...prevRoom,
          numCols: parseInt(value),
        };
      } else {
        return {
          ...prevRoom,
          roomNumber: value,
        };
      }
    });
  }

  return (
    <div>
        <div className="topic">
            <h1>Create a new Movie Theatre</h1>
        </div>
          <div className="loginBox">
              <div className="loginForm">
                  <input
                      required
                      placeholder="Theatre Number: 1/2/3"
                      autoComplete="false"
                      type="number"
                      name="roomNumber"
                      onChange={handleChange}
                  />
              </div>
          </div>
        <div className="overall">
          <label for="numRows">Number of rows: </label>
          <input
            type="number"
            min="1"
            max="26"
            id="numRows"
            name="numRows"
            onChange={handleChange}
            value={room.numRows}
            onKeyDown={(e) => e.preventDefault()}
          ></input>
          <br></br>
          <br></br>
          <label for="numCols">Number of columns:</label>
          <input
            type="number"
            min="1"
            max="40"
            id="numCols"
            name="numCols"
            onChange={handleChange}
            value={room.numCols}
            onKeyDown={(e) => e.preventDefault()}
          ></input>
      </div>
    </div>
  );
}

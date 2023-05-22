import React, { useState } from "react";
import "./css/seats.css";

export default function SeatSelector({ numRows, numCols }) {
  const convertNum = (num) => {
    if (num < 1 || num > 26 || typeof num !== "number") {
      return -1;
    }
    const bound = 64; //  ASCII: A = 65
    return String.fromCharCode(num + bound);
  };

  const rows = [];

  for (let i = 1; i <= numRows; i++) {
    const seats = [];
    for (let j = 1; j <= numCols; j++) {
      const seat = j;
      seats.push(
        <button
          className="seat-colors"
          key={seat}
          style={{
            backgroundColor: "green",
            color: "black",
            fontSize: "16px",
            width: "35px",
            height: "35px",
            margin: "2px",
          }}
        >
          {seat}
        </button>
      );
    }

    rows.push(
      <div key={i}>
        <span className="char">{convertNum(i)}:</span> {seats}
      </div>
    );
  }

  return (
    <div>
      <div className="screen">
        <h2>SCREEN</h2>
      </div>
      <div className="overall">
        <div>{rows}</div>
        <br></br>
      </div>
    </div>
  );
}

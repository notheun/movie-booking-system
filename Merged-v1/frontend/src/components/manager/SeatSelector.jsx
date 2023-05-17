import React, { useState } from "react";
import "./seats.css";

export default function SeatSelector({ numRows, numCols }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [avail, setAvail] = useState(true);

  function handleSeatClick(row, col) {
    const newSelectedSeats = [...selectedSeats];
    const seatIndex = newSelectedSeats.findIndex(
      (selectedSeat) => selectedSeat.row === row && selectedSeat.col === col
    );
    if (seatIndex > -1) {
      newSelectedSeats.splice(seatIndex, 1);
      setSelectedSeats(newSelectedSeats);
    } else {
      newSelectedSeats.push({ row, col });
      setSelectedSeats(newSelectedSeats);
    }
  }

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
          key={seat}
          onClick={() => handleSeatClick(i, seat)}
          style={{
            backgroundColor: selectedSeats.some(
              (selectedSeat) =>
                selectedSeat.row === i && selectedSeat.col === seat
            )
              ? avail
                ? "red" // current cust click
                : "green" // avail
              : avail
              ? "green"
              : "gray", // for future use - represent seats taken by other cust
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
      {/* <div className="middle">
        Selected seats:{" "}
        {selectedSeats
          .map((seat) => `${convertNum(seat.row)}${seat.col}`)
          .join(", ")}
        <br></br>
      </div> */}
    </div>
  );
}

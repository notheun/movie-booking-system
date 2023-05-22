import React, { useState, useEffect } from "react";

import StaffBookMovie from "../staff/StaffBookMovie";

import "./seats.css";

export default function SeatSelector({ numRows, numCols, onSeatSelection }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [avail, setAvail] = useState(true);

  function handleSeatClick(row, col) {
    const seatNumber = `${convertNum(row)}${col}`; // convert
    const isSeatSelected = selectedSeats.some(
      (selectedSeat) => selectedSeat.row === row && selectedSeat.col === col
    );

    if (isSeatSelected) {
      const newSelectedSeats = selectedSeats.filter(
        (selectedSeat) => selectedSeat.row !== row || selectedSeat.col !== col
      );
      setSelectedSeats(newSelectedSeats);
    } else {
      setSelectedSeats((prevSelectedSeats) => [
        ...prevSelectedSeats,
        { row, col, seatNumber },
      ]);
    }
  }

  useEffect(() => {
    onSeatSelection(selectedSeats);
  }, [selectedSeats, onSeatSelection]);

  const convertNum = (num) => {
    if (num < 1 || num > 26 || typeof num !== "number") {
      return -1;
    }
    const bound = 64; // ASCII: A = 65
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
                ? "#bf3131" // current cust click
                : "#009933" // avail
              : avail
              ? "#009933"
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
      <div>{rows}</div>
      <br />
      <div>
        Selected seats:{" "}
        {selectedSeats
          .map((seat) => `${convertNum(seat.row)}${seat.col}`)
          .join(", ")}
      </div>
      <br />
    </div>
  );
}

import "./styles.css";
import SeatSelector from "./component/seat/SeatSelector";
import SeatManager from "./component/seat/SeatManager";
import { useState } from "react";

export default function App() {
  const [numSeat, setNumSeat] = useState({
    numRows: "",
    numCols: ""
  });

  function handleSeatManagerChange(newNumSeat) {
    setNumSeat(newNumSeat);
  }

  return (
    <div className="App">
      <SeatManager numSeat={numSeat} onChange={handleSeatManagerChange} />
      <SeatSelector numRows={numSeat.numRows} numCols={numSeat.numCols} />
    </div>
  );
}

/* 
draft for testing functions only

things to do:
useState for availability of seats (done)
convert row number to char (done)
separate the functions:
cust can only select seats
manager can change num of seats
 */

import React, { useState, useEffect } from "react";

export default function SeatManager(props) {
  const [numSeat, setNumSeat] = useState({
    numRows: "10",
    numCols: "10",
  });

  useEffect(() => {
    if (props.onChange) {
      props.onChange(numSeat);
    }
  }, [numSeat, props.onChange]);

  function handleChange(event) {
    const { name, value } = event.target;

    setNumSeat(() => {
      if (name === "numRows") {
        return {
          numRows: parseInt(value),
          numCols: numSeat.numCols,
        };
      } else if (name === "numCols") {
        return {
          numRows: numSeat.numRows,
          numCols: parseInt(value),
        };
      }
    });
  }

  return (
    <div>
      <div className="overall">
        {/*<p>test change: {numSeat.numRows}, {numSeat.numCols}</p>*/}
        <label for="numRows">Number of rows: </label>
        <input
          type="number"
          min="1"
          max="26"
          id="numRows"
          name="numRows"
          onChange={handleChange}
          value={numSeat.numRows}
          onKeyDown={(e) => e.preventDefault()}
          style={{ caretColor: "transparent" }}
        ></input>
        <br></br>
        <br></br>
        <label for="numCols">Number of columns: </label>
        <input
          type="number"
          min="1"
          max="50"
          id="numCols"
          name="numCols"
          onChange={handleChange}
          value={numSeat.numCols}
          onKeyDown={(e) => e.preventDefault()}
          style={{ caretColor: "transparent" }}
        ></input>
      </div>
    </div>
  );
}

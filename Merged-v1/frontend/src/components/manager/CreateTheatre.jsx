import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import SeatSelector from "./SeatSelector";
import SeatManager from "./SeatManager";
import { useState, useRef } from "react";
import "./createtheatre.css";

const CreateTheatre = () => {
    // function for seats
    const [room, setRoom] = useState({
        id: null,
        roomNumber: "",
        numRows: "",
        numCols: "",
    });

    function handleSeatManagerChange(newRoom)    {
        setRoom(newRoom);
    }
    
    //create new Movie theatre function

    function createMovieTheatre() {}
    //  function for fill theatre number
    //  ---------------------------------------
    //  const [file, setFile] = useState(null);
    //      const [user, setUser] = useState({
    //          threaternumber: "",
    //  });
    //   const inputRef = useRef();
    //   const handleOpenFile = () => {
    //     inputRef.current.click();
    //   };
    //   const handleInputFilechange = (event) => {
    //     setFile(event.target.files[0]);
    //   };
    //   const handleChangeInput = (e) => {
    //     const name = e.target.name; // name here means the name of the input field
    //     const value = e.target.value; // value of that input field

    //     setUser((prev) => {
    //       return {
    //         ...prev,
    //         [name]: value,
    //       };
    //     });
    //   };

    return (
        <div>
            <SignedOutNavbar />
            <ManagerNavbar />
            <div className="topic">
                <h1>Create a new Movie Theatre</h1>
            </div>
            <div className="loginBox">
                <div className="loginForm">
                    <input
                        required
                        placeholder="Theatre Number: 1/2/3"
                        autoComplete="false"
                        type="text"
                        name="theatrenumber"
                        // onChange={handleChangeInput}
                        onChange={handleSeatManagerChange}
                    />
                </div>
            </div>
            <SeatManager numSeat={room} onChange={handleSeatManagerChange} />
            <SeatSelector numRows={room.numRows} numCols={room.numCols} />
            <div className="overall">
                <button className="mainBtns" onClick={createMovieTheatre}>
                    Create
                </button>
            </div>
        </div>
    );
}

export default CreateTheatre;
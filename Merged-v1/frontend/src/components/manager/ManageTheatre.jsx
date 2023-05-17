import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "./createmovie.css";

export default function ManageTheatre() {
  const deleteTheatre = () => {
    return;
  };
  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Edit Movie Theatre</h1>
      </div>
      <div className="movieBox">
        <button className="mainBtns" onClick={deleteTheatre}>
          Delete Theatre
        </button>
      </div>
    </div>
  );
}

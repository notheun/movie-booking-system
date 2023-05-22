import "./logout.css";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <>
      <div className="loginHeaderInnerBox">
        <img
          width={"45px"}
          src="/images/logo.png"
          alt="logo"
          draggable={"false"}
        />
        <h3>
          <span className="appName_loginModal">Film</span> Production
        </h3>
      </div>
      <div className="topheader">
        <h1>You have successfully Logout.</h1>
      </div>
      <Link to={"/"}>
        <span span className="authBottomText">
          Return to Main Page
        </span>
      </Link>
    </>
  );
}

export default Logout;
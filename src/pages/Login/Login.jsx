import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [LoginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginRequest((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleLogin = async () => {
    console.log(
      "i am sending this data to the backend / server to store it into the database ",
      LoginRequest
    );

    //  const response = await   fetch("https://filmProduction/api/v1/login",{
    //         method:"POST",
    //          headers: {
    //            "Content-Type": "application/json",
    //          },
    //          body:JSON.stringify(LoginRequest)
    //        })

    // {
    //     Username:"T1234",
    //     isAdmin:false
    // }

    // if(response.data.isAdmin){
    //     navigate("/admin");
    // }else{

    // }

    /* //use this to run
    fetch('/login', {
  method: 'POST',
  body: JSON.stringify({ username, password }),
  headers: {
    'Content-Type': 'application/json'
  }
  })
.then(response => response.text())
.then(url => {
  window.location.href = url;
});
    */

    navigate("/admin");
  };

  return (
    <div className="loginBox">
      <div className="loginHeader">
        <h3>Login</h3>
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
      </div>
      <div className="loginForm">
        <input
          required
          placeholder="Username"
          autoComplete="false"
          type="text"
          name="username"
          onChange={handleInputChange}
        />

        <input
          required
          placeholder="Password"
          autoComplete="false"
          type="password"
          name="password"
          onChange={handleInputChange}
        />
        <button className="mainBtns" onClick={handleLogin}>
          login
        </button>
      </div>
      <div className="authBottomBox">
        <Link to="/register">
          <span span className="authBottomText">
            Do not have an account ? Click here
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

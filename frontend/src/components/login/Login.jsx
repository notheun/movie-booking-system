import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import LoginService from "../../services/LoginService";
import UserService from "../../services/UserService";


const Login = () => {
  const [LoginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  const [customer, setCustomer] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginRequest((prev) => {
      return { 
        ...prev, 
        [name]: value 
      };
    });
  };

  useEffect(() => {
      getCustId(LoginRequest.username);
  }, [LoginRequest.username]);

  // console.log(customer);
 
  const getCustId = (username) => {
    UserService.findByUsername(username)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data.id);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const loginUser = async() => {
    try {
      const res = await LoginService.loginUser(LoginRequest);
    
      if (res.data === "localhost:3000/login/admin") {
        navigate("/login/admin");
      } else if (res.data === "localhost:3000/login/manager") {
        navigate("/login/manager");
      } else if (res.data === "localhost:3000/login/staff") {
        navigate("/login/staff");
      } else if (res.data === "localhost:3000/login/customer") {
        // stores key-value pairs even after closing or refreshing
        // data is deleted only after clearing browser's cache or local storage
        localStorage.setItem("customerId", customer.id);
        navigate(`/${customer.id}`);
      }
    }
    catch (e) {
      if (e.response.status === 401) {  // UNAUTHORIZED
        alert("Incorrect password or username");
      } else if (e.response.status === 403) { // FORBIDDEN
        alert("Account suspended");
      } else {
        alert("Something went wrong. Please try again later.");
      }
      console.log(e);
    }
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
        <button className="mainBtns" onClick={loginUser}>
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

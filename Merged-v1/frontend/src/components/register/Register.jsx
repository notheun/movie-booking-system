import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import UserService from "../../services/UserService";

const Register = () => {
  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "customer",
    isActive: true,
    confirmPassword: "",
  })

  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const name = e.target.name; // name here means the name of the input field
    const value = e.target.value; // value of that input field

    setUser((prev) => {
      return { 
        ...prev, 
        [name]: value 
      };
    });
  };

  const isPasswordValid = () => {
    if (user.password === user.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const isEmpty = () => {
    if (user.username.trim() === "" ||
        user.email.trim() === "" ||
        user.password.trim() == "" ||
        user.confirmPassword.trim() == "")
      return true;
    else
      return false;
  }

  const registerUser = () => {
    if (isEmpty()) {
      alert("Please enter all the details");
      return; // end function here
    }

    if (!isPasswordValid()) {
      alert("Password does not match");
      return; 
    }

    // if password matches, and fields not empty, createUser
    // once password matches, set undefined to remove confirmPassword from state
    const registerRequest = { ...user, confirmPassword: undefined };
    delete registerRequest.confirmPassword;

    UserService.registerUser(registerRequest)
      .then((res) => {
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          role: res.data.role,
          isActive: res.data.isActive
        });
        setIsCreated(true);
        alert("Registration successful");
        navigate("/users/" + user.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // use this if there is a "Create another user" button to reset all fields
  const newUser = () => {
    setUser({
      id: null,
      username: "",
      email: "",
      password: "",
      role: "",
      isActive: true,
      confirmPassword: "",
    });

    setIsCreated(false);
  };

  return (
    <div className="loginBox">
      <div className="loginHeader">
        <h3>Get Registered </h3>
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
          onChange={handleChangeInput}
        />
        <input
          required
          placeholder="Email"
          autoComplete="false"
          type="email"
          name="email"
          onChange={handleChangeInput}
        />

        <input
          required
          placeholder="Password"
          onChange={handleChangeInput}
          autoComplete="false"
          type="password"
          name="password"
          id=""
        />

        <input
          required
          placeholder="confirm password"
          autoComplete="false"
          onChange={handleChangeInput}
          type="password"
          name="confirmPassword"
          id=""
        />

        <button className="mainBtns" onClick={registerUser}>
          Register
        </button>
      </div>
      <div className="authBottomBox">
        <Link to="/login">
          <span span className="authBottomText">
            Already have an account ? Click here
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Register;

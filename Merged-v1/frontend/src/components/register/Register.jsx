import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginService from "../../services/LoginService";
import "./register.css";

const Register = () => {
  const currentDate = new Date();
  const maxDate = currentDate.toISOString().slice(0, 10);
  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "customer",
    isActive: true,
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    seatPref: "",
    confirmPassword: "",
  });

  const [date, setDate] = useState(currentDate);

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const name = e.target.name; // name here means the name of the input field
    const value = e.target.value; // value of that input field

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setDate(date);
  
    const [year, month, day] = date.split("-");
  
    setUser((prev) => {
      return {
        ...prev,
        birthYear: year,
        birthMonth: month,
        birthDay: day,
      }
    });
  }  

  const handleDateFocus = (e) => {
    if (e.currentTarget.value === "") {
      e.currentTarget.type = "date";
      e.currentTarget.placeholder = "Date of Birth";
    }
  };

  const handleDateBlur = (e) => {
    if (e.currentTarget.value === "") {
      e.currentTarget.type = "text";
      e.currentTarget.placeholder = "Date of Birth";
      setDate("");
    }
  };

  const isPasswordValid = () => {
    if (user.password === user.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const isEmailValid = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(user.email);
  };

  const isEmpty = () => {
    if (
      user.username.trim() === "" ||
      user.email.trim() === "" ||
      user.password.trim() === "" ||
      user.confirmPassword.trim() === "" ||
      user.birthYear === "" ||
      user.birthMonth === "" ||
      user.birthDay === "" ||
      user.seatPref === "" 
    )
      return true;
    else return false;
  };

  const registerUser = () => {
    if (isEmpty()) {
      alert("Please enter all the details");
      return; // end function here
    }

    if (!isPasswordValid()) {
      alert("Password does not match");
      return;
    }

    if (!isEmailValid()) {
      alert("Please enter a valid email address");
      return;
    }

    // if password matches, and fields not empty, createUser
    // once password matches, set undefined to remove confirmPassword from state
    const registerRequest = { ...user, confirmPassword: undefined };
    delete registerRequest.confirmPassword;

    LoginService.registerUser(registerRequest)
      .then((res) => {
        setUser({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          password: res.data.password,
          role: res.data.role,
          isActive: res.data.isActive,
          birthYear: res.data.birthYear,
          birthMonth: res.data.birthMonth,
          birthDay: res.data.birthDay,
          seatPref: res.data.seatPref,
        });
        alert("Registration successful");
        navigate("/login");
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
      role: "customer",
      isActive: true,
      birthYear: "",
      birthMonth: "",
      birthDay: "",
      seatPref: "",
      confirmPassword: "",
    });
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
          value={user.username}
          onChange={handleChangeInput}
        />
        <input
          required
          placeholder="Email"
          autoComplete="false"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChangeInput}
        />
        <select 
          name="seatPref" 
          onChange={handleChangeInput}
          value={user.seatPref}
        >
          <option disabled selected>
            Seat Preference
          </option>
          <option value="front">Front</option>
          <option value="middle">Middle</option>
          <option value="end">End</option>
        </select>
        <input
          placeholder="Date of Birth"
          type="date"
          id="dob"
          name="dob"
          min=""
          max={maxDate}
          value={date}
          onChange={handleDateChange}
          onFocus={handleDateFocus}
          onBlur={handleDateBlur}
        />
        <input
          required
          placeholder="Password"
          onChange={handleChangeInput}
          value={user.password}
          autoComplete="false"
          type="password"
          name="password"
          id=""
        />

        <input
          required
          placeholder="Confirm Password"
          autoComplete="false"
          onChange={handleChangeInput}
          value={user.confirmPassword}
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
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../services/UserService";
import "./user.css";

export default function CreateUser() {
  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  /*
  const [id, setId] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("abc123");
  const [role, setRole] = useState("staff");
  const [status, setStatus] = useState(true);

  // handle changes
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  /*
  const saveUser = () => {
    var data = {
      username: username,
      email: email,
      password: password,
      role: role,
    };

    UserService.createUser(data)
      .then((res) => {
        setId(res.data.id);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPassword(res.data.password);
        setRole(res.data.role);
        setStatus(res.data.status);

        setIsCreated(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const newUser = () => {
    setId(null);
    setUsername("");
    setEmail("");
    setPassword("abc123");
    setRole("Staff");
    setStatus(true);

    setIsCreated(false);
  };

  const allRoles = [
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];
  */

  const [user, setUser] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
    confirmPassword: "",
  })

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
        user.role == "" ||
        user.password.trim() == "" ||
        user.confirmPassword.trim() == "")
      return true;
    else
      return false;
  }

  /*
  const isTaken = () => {
    const temp = "";
    const searchByUsername = (username) => {
      UserService.findByUsernameContaining(user.username)
        .then((res) => {
          const {username} = res.data;
          temp = username;
        })
        .catch((e) => {
          console.log("User not found");
        });
    };
    
    if (user.username === temp)
      return true;
    else 
      return false;
  }
  */

  const saveUser = () => {
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
    const userDetails = {...user, confirmPassword: undefined};
    delete userDetails.confirmPassword; 

    UserService.createUser(userDetails)
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
        alert("User created successfully");
        navigate("/login/admin");
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
          onChange={handleChangeInput}
          name="username"
          id=""
        />
        <input
          required
          placeholder="Email"
          autoComplete="false"
          type="email"
          onChange={handleChangeInput}
          name="email"
          id=""
        />

        <select name="role" onChange={handleChangeInput}>
          <option disabled selected>
            Role
          </option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>
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
        
        <button className="mainBtns" onClick={saveUser}>
          Create User
        </button>
        <Link to="/login/admin">
          <button className="mainBtns">
            Return
          </button>
        </Link>
      </div>
    </div>
  );
}

  /*
  return (
    
    <div>
      <div className="userlist-cont">
        <h1>Create New User</h1>
      </div>
      {isCreated ? (
        <div>
          <h3>User created successfully</h3>
          <button
            className="mainBtns"
            variant="outlined"
            color="primary"
            onClick={newUser}
          >
            Create Another
          </button>
        </div>
      ) : (
        <div>
          <div className="createNewUser">
            <TextField
              className="editTextField"
              id="outlined"
              label="Username"
              autoComplete="off"
              color="warning"
              value={username}
              onChange={onUsernameChange}
            ></TextField>
            <TextField
              className="editTextField"
              id="outlined"
              label="Email"
              autoComplete="off"
              color="warning"
              value={email}
              onChange={onEmailChange}
            ></TextField>
            <TextField
              className="editTextField"
              select
              id="outlined-select"
              label="Role"
              color="warning"
              value={role}
              onChange={onRoleChange}
            >
              {allRoles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="buttonForCreate">
            <button
              className="mainBtns"
              variant="contained"
              color="success"
              onClick={saveUser}
            >
              Create
            </button>
            <Link to={"/users"}>
              <span span className="authBottomText">
                Return to Main Page
              </span>
              {/* <button className="mainBtns" variant="contained" color="primary">
                Return
              </button>}
            </Link>
          </div>
        </div>
      )}
    </div>
    
  );
  */

import { useNavigate } from "react-router-dom";
import { useState } from "react";
const CreateUserProfile = () => {
  const [createrUserState, setCreaterUserState] = useState({
    username: "",
    email: "",
    password: "",
    profileType: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleAddUser = () => {
    let isValid = isPasswordValid();

    if (isValid) {
      delete createrUserState.confirmPassword;
      console.log(
        "i am sending this data to backend ",
        JSON.stringify(createrUserState)
      );
      fetch("https://filmProduction/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createrUserState),
      });

      navigate("/admin");
    } else {
      alert("the password is incorrect");
    }
  };

  // function to check if the password is same

  const isPasswordValid = () => {
    if (createrUserState.password === createrUserState.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeInput = (event) => {
    const name = event.target.name; //lastName
    const value = event.target.value; // tan

    setCreaterUserState((prev) => {
      return { ...prev, [name]: value };
    });
  };

  console.log(createrUserState);

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

        <select name="profileType" onChange={handleChangeInput}>
          <option disabled selected>
            choose user type
          </option>
          <option value="manager">manager</option>
          <option value="staff">staff</option>
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

        <button className="mainBtns" onClick={handleAddUser}>
          Create User
        </button>
      </div>
    </div>
  );
};

export default CreateUserProfile;

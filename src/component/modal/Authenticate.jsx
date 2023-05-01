import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { DoggosContext } from "../../context/context";
import { LoginUser, registerUser } from "../../services/utilityFunctions";
import "./authentication.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
function AuthenticationModal({ children, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [method, setMethod] = useState("login");

  const { dispatch } = useContext(DoggosContext);
  const [authData, setAuthData] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (type === "LOgin") {
      setMethod("login");
    } else {
      setMethod("register");
    }
  }, [type]);

  const handleInputChange = (name, value) => {
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClose = () => {
    dispatch({ type: "setModalClose" });
    onClose();
  };

  // modal style

  const handleSubmit = () => {
    if (method === "login") {
      const data = LoginUser(authData);
      if (data.success) {
        dispatch({ type: "setUserData", payload: data.message });
        setAuthData({
          email: "",
          username: "",
          password: "",
        });
        handleClose();
        dispatch({
          type: "setSnackData",
          payload: {
            open: true,
            text: "Successfully Loggedin Welcome to Film Production",
          },
        });
      } else {
        dispatch({
          type: "setSnackData",
          payload: { open: true, text: "Invalid Credentials . Try Again !" },
        });
      }
    } else {
      const data = registerUser(authData);
      if (data.success) {
        dispatch({ type: "setUserData", payload: data.message });
        setAuthData({
          email: "",
          username: "",
          password: "",
        });
        handleClose();
        dispatch({
          type: "setSnackData",
          payload: {
            open: true,
            text: "Successfully Registered Welcome to Film Production",
          },
        });
      } else {
        dispatch({
          type: "setSnackData",
          payload: { open: true, text: "Invalid Credentials . Try Again !" },
        });
      }
    }
  };

  return (
    <>
      <span
        onClick={() => {
          dispatch({ type: "setModalOpen" });
          onOpen();
        }}
      >
        {children}
      </span>
      <Modal
        mou
        closeOnOverlayClick={true}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <ModalOverlay
          width={"100vw"}
          height={"100vh"}
          background={"#1515158c"}
        />
        <ModalContent
          borderRadius={"10px"}
          padding={"0rem"}
          margin={"0em auto"}
          marginTop={"4em"}
          overflow={"scroll"}
          maxHeight={"100vh"}
          backgroundColor={"#212426"}
          minHeight={"300px"}
          className={"chakraModal"}
          zIndex={100}
        >
          <ModalBody background={"purple.100"} zIndex={100}>
            <div className="loginBox">
              <div className="loginHeader">
                <h3>{method === "login" ? "LOgin" : "sign UP"}</h3>
                <div className="loginHeaderInnerBox">
                  <img
                    width={"45px"}
                    src="/images/logo.png"
                    alt="logo"
                    draggable={"false"}
                  />
                  <h3>
                    {" "}
                    <span className="appName_loginModal">Film</span> Production
                  </h3>
                </div>
              </div>
              <div className="loginForm">
                <input
                  required
                  placeholder="Email Address"
                  autoComplete="false"
                  type="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  name="email"
                  id=""
                />
                {method === "register" ? (
                  <input
                    required
                    placeholder="Username"
                    autoComplete="false"
                    type="password"
                    name=""
                    id=""
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                ) : (
                  ""
                )}
                <input
                  required
                  placeholder="Password"
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  autoComplete="false"
                  type="password"
                  name="password"
                  id=""
                />
                <button className="mainBtns" onClick={handleSubmit}>
                  {method === "login" ? (
                    <LockOpenIcon className="navIcons" />
                  ) : (
                    <HowToRegIcon className="navIcons" />
                  )}
                  {method === "login" ? "Login" : "Sign up"}
                </button>
              </div>
              <div className="authBottomBox">
                {method === "login" ? (
                  <span
                    span
                    className="authBottomText"
                    onClick={() => setMethod("register")}
                  >
                    Do not have an account ? Click here
                  </span>
                ) : (
                  <span
                    className="authBottomText"
                    onClick={() => setMethod("login")}
                  >
                    Already have an account ?
                  </span>
                )}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthenticationModal;

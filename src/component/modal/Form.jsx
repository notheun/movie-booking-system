import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

import "./authentication.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useContext } from "react"
import { DoggosContext } from "../../context/context";
function AuthenticationModal({ children, type }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { dispatch } = useContext(DoggosContext)

  const handleClose = () => {

  }

  return (
    <>
      <span
        onClick={() => {
          dispatch({ type: "setModalOpen" });
          onOpen();
          console.log("opening");
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

                <div className="loginHeaderInnerBox">
                  <img
                    width={"45px"}
                    src="/images/logo.png"
                    alt="logo"
                    draggable={"false"}
                  />
                  <h3>Release a dog</h3>
                </div>
              </div>
              <div className="loginForm">
                <input
                  required
                  placeholder="Onwers Name"
                  autoComplete="false"
                  type="text"
                  name="text"
                  id=""
                />

                <input
                  required
                  placeholder="Address"

                  autoComplete="false"
                  type="text"
                  name="text"
                  id=""
                />
                <input
                  required
                  placeholder="Phone Number"

                  autoComplete="false"
                  type="text"
                  name="text"
                  id=""
                />

                <select className="form_item petSelect">
                  <option value="" disabled>Pet Type</option>
                  <option value="Cat">Cat</option>
                  <option value="dog">Dog</option>
                </select>
                <input
                  required
                  placeholder="Pet Name"

                  autoComplete="false"
                  type="text"
                  name="text"
                  id=""
                />
                <input
                  required
                  placeholder="Page Age"

                  autoComplete="false"
                  type="text"
                  name="text"
                  id=""
                />
                <button className="mainBtns" >
                  Publish
                </button>
              </div>
              <div className="authBottomBox">

              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthenticationModal;

import "./home.css";
import { useContext } from "react";
import { userContext } from "../../context/context";
import Navbar from "../../components/Navbar";

const Home = () => {
  const { dispatch } = useContext(userContext);

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home_container">
          <div className="home_header"></div>
        </div>
      </div>
    </>
  );
};

export default Home;

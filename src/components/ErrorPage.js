import React from "react";
import error404Image from "../assets/images/confusion.png";
import error500Image from "../assets/images/server-down.png";
import errorImage from "../assets/images/sad.png";
import { useParams, useNavigate } from "react-router-dom";
const Error = () => {
  const params = useParams();
  const error = params.error;
  console.log(error)
  const navigate = useNavigate();
  const redirectToAccountPage = () => {
    navigate('/'); 
  };


  if (error == 404) {
    return (
      <div className="error404">
        <img className="error-image" src={error404Image} alt="404 Error" />
        <h1 className="error-title">404 Not Found</h1>
        <p className="error-message">Sorry, the page you are looking for does not exist.</p>
        <button className="error-button" onClick={redirectToAccountPage}>Go to Account Page</button>
      </div>
    );
  } else if (error == 500) {
    return (
      <div className="error500">
        <img className="error-image" src={error500Image} alt="500 Error" />
        <h1 className="error-title">500 Internal Error</h1>
        <p className="error-message">Sorry, our server is under maintainence.</p>
      </div>
    );
  } else {
    return (
      <div className="error">
        <img className="error-image" src={errorImage} alt="Error" />
        <p className="error-message">Uh oh, something went wrong</p>
      </div>
    );
  }
};

export default Error;
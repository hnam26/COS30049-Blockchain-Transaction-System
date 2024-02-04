import React from "react";
import errorImage from "../assets/images/sad.png";

const HandleRevenueError = () => {
    return (
        <>
            <div className="revenueError">
                <img src={errorImage} alt="Error" />
                <p>
                    Sorry, we couldn't find the result you are looking for.
                </p>
            </div>
            <div style={{ height: "60vh" }}></div>
        </>
    );
};

export default HandleRevenueError;

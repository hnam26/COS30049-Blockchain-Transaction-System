import React from "react";
import errorImage from "../assets/images/sad.png";

// HandleRevenueError component
const HandleRevenueError = () => {
    // Render error message with image
    return (
        <div className="revenueError">
            <img src={errorImage} alt="Error" />
            <p>
                Sorry, we couldn't find the result you are looking for.
            </p>
        </div>
    );
};

// Export HandleRevenueError component
export default HandleRevenueError;

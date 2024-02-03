import React from "react";
import errorImage from "../assets/sad.png";

export function handleRevenueError() {
    return (
        <div className="revenueError">
            <img src={errorImage} alt="Error" />
            <p>
                Sorry, we couldn't find the result you are looking for.
            </p>         
        </div>
    );
}

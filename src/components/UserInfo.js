import React, { useState } from "react";
import avatar from "../assets/images/avatar.png";
import "../styles/user-info.css";
const UserInfo = ({ summary, node }) => {
    const [showPopup, setShowPopup] = useState(false);
    const nodeId = node.properties.addressId;
    const type = node.properties.type;

    const shortenNodeId = (nodeId) => {
        const firstThreeLetters = nodeId.slice(2, 5);
        const lastThreeLetters = nodeId.slice(-3);
        return firstThreeLetters + lastThreeLetters;
    };

    // const ethToDollars = (ethcoinAmount, rate) => {
    //     // Convert Bitcoin to dollars using the provided rate
    //     const dollars = ethcoinAmount * rate;
    //     return dollars;
    // };

    const handleCopyToClipboard = () => {
        // Copy the content of node.id to the clipboard
        navigator.clipboard.writeText(nodeId)
            .then(() => {
                // Show the popup message
                setShowPopup(true);
                // Hide the popup message after 2 seconds
                setTimeout(() => {
                    setShowPopup(false);
                }, 3000);
            })
            .catch((error) => {
                // console.error("Failed to copy:", error);
            });
    };
    // Render UserInfo component
    return (
        <>
            {showPopup && (
                <div className="popup-message">Copied to clipboard!</div>
            )}
            <div className="user-info">
                {/* Avatar image */}
                <img
                    src={avatar}
                    alt="Avatar"
                    className="avatar"
                />

                {/* User information content */}
                <div className="content">
                    <p> {shortenNodeId(nodeId)}</p>
                    {/* Format address details */}
                    <div className="format-address">
                        <div className="format-address-icon"></div>
                        <span>{type}</span>
                    </div>

                    {/* QR code section */}
                    <div className="qr-frame" onClick={handleCopyToClipboard}>
                        <div style={{ width: "max-content", display: "inline-flex" }}>
                            <div className="qr-background">
                                <div className="qr-icon"></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.1rem" }}>Bitcoin Address</p>
                            <div className="qr-content">
                                <span>{nodeId}</span>
                                <div className="copy-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance section*/}
                <div className="balance-frame">
                    <div className="balance-info">
                        <div className="balance-header">ETH Balance</div>
                        <div className="balance-data">
                            <span className="balance-wallet">{+summary.receive - summary.sent} ETH</span>
                            {/* <span className="dot">•</span> */}
                            {/* <span className="covert-dollar">${ethToDollars(+summary.receive - summary.sent, 3739.81)}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Export UserInfo component
export default UserInfo;

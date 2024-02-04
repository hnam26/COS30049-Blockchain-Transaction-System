import React, { useState, useEffect } from "react";
import avatar from "../assets/images/avatar.png";
import UserInfoCss from "../styles/user-info.css";
const UserInfo = ({ props: { nodes, summary } }) => {
    const node = nodes[0];
    const [showPopup, setShowPopup] = useState(false);
    const shortenNodeId = (nodeId) => {
        if (typeof nodeId !== 'string' || nodeId.length < 6) {
            throw new Error('Invalid input. Expected a string with length greater than or equal to 6.');
        }

        const firstThreeLetters = nodeId.slice(0, 3);
        const lastThreeLetters = nodeId.slice(-3);

        return firstThreeLetters + lastThreeLetters;
    };

    const bitcoinToDollars = (bitcoinAmount, bitcoinToDollarRate) => {
        // Convert Bitcoin to dollars using the provided rate
        const dollars = bitcoinAmount * bitcoinToDollarRate;
        return dollars;
    };


    function calculateTotal(summary) {
        // Extract numeric values from the strings
        const totalReceived = parseFloat(summary.totalReceived.split(' ')[0]);
        const totalSent = parseFloat(summary.totalSent.split(' ')[0]);

        // Calculate the total
        const total = totalReceived - totalSent; // Assuming totalReceived represents income and totalSent represents expenses

        return total;
    }

    const handleCopyToClipboard = () => {
        // Copy the content of node.id to the clipboard
        navigator.clipboard.writeText(node.id)
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
                <p>{shortenNodeId(node.id)}</p>
                {/* Format address details */}
                <div className="format-address">
                    <div className="format-address-icon"></div>
                    <span>Legacy</span>
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
                            <span>{node.id}</span>
                            <div className="copy-icon"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Balance section */}
            <div className="balance-frame">
                <div className="balance-info">
                    <div class="balance-header">Bitcoin Balance</div>
                    <div className="balance-data">
                        <span class="balance-wallet">{calculateTotal(summary)} BTC</span>
                        <span class="dot">•</span>
                        <span class="covert-dollar">${bitcoinToDollars(calculateTotal(summary), 40000)}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
);
};

// Export UserInfo component
export default UserInfo;

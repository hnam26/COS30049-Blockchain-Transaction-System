import React from "react";
import "../../styles/user-info.css";
const UserInfoSke = () => {
    return (
        <>
            <div className="user-info loading">
                {/* Avatar image */}
                <div className="avatar"></div>

                {/* User information content */}
                <div className="content">
                    <p></p>
                    {/* Format address details */}
                    <div className="format-address">
                        {/* <div className="format-address-icon"></div> */}
                        <span></span>
                    </div>

                    {/* QR code section */}
                    <div className="qr-frame">
                        <div style={{ width: "max-content", display: "inline-flex" }}>
                            <div className="qr-background">
                                {/* <div className="qr-icon"></div> */}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <p style={{ fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.1rem" }}></p>
                            <div className="qr-content">
                                <span></span>
                                {/* <div className="copy-icon"></div> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Balance section*/}
                <div className="balance-frame">
                    <div className="balance-info">
                        <div className="balance-header"></div>
                        <div className="balance-data">
                            <span className="balance-wallet"></span>
                            <span className="dot"></span>
                            <span className="covert-dollar"></span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default UserInfoSke;
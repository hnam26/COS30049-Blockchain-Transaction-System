import React from "react";
import Summary from "../../styles/summary.css";
const TransactionSummarySke = () => {
    // Render summary section
    return (
        <section className="transaction-summary loading">
            <h2 className="summary-title"></h2>
            <div className="summary-stats">
                {/* Display total transactions */}
                <div className="summary-stat">
                    <p></p>
                    <span><b></b></span>
                </div>

                {/* Display total received amount */}
                <div className="summary-stat">
                    <p></p>
                    <span><b></b></span>
                </div>

                {/* Display total sent amount */}
                <div className="summary-stat">
                    <p></p>
                    <span><b></b></span>
                </div>
            </div>
        </section>
    );
};
export default TransactionSummarySke;
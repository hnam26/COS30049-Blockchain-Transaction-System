import React from "react";
import Summary from "../styles/Summary.css";

// TransactionSummary component
const TransactionSummary = ({ summary }) => {
  // Render summary section
  return (
    <section className="transaction-summary">
      <h2>Summary</h2>
      <div className="summary-stats">
        {/* Display total transactions */}
        <div className="summary-stat">
          <p>Total transactions</p>
          <span><b>{summary.totalTransactions}</b></span>
        </div>

        {/* Display total received amount */}
        <div className="summary-stat">
          <p>Total received</p>
          <span><b>{summary.totalReceived}</b></span>
        </div>

        {/* Display total sent amount */}
        <div className="summary-stat">
          <p>Total sent</p>
          <span><b>{summary.totalSent}</b></span>
        </div>
      </div>
    </section>
  );
};

// Export TransactionSummary component
export default TransactionSummary;

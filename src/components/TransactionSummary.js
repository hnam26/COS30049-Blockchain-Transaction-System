import React from "react";
import Summary from "../styles/summary.css";
import { useParams } from "react-router-dom";
const TransactionSummary = ({ summary }) => {
  // Render summary section
  return (
    <section className="transaction-summary">
      <h2>Summary</h2>
      <div className="summary-stats">
        {/* Display total transactions */}
        <div className="summary-stat">
          <p>Total transactions</p>
          <span><b>{summary.totalCount}</b></span>
        </div>

        {/* Display total received amount */}
        <div className="summary-stat">
          <p>Total received</p>
          <span><b>{summary.receive}</b></span>
        </div>

        {/* Display total sent amount */}
        <div className="summary-stat">
          <p>Total sent</p>
          <span><b>{summary.sent}</b></span>
        </div>
      </div>
    </section>
  );
};

// Export TransactionSummary component
export default TransactionSummary;

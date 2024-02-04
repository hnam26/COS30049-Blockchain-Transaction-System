import React from "react";
import Summary from "../styles/summary.css";
const TransactionSummary = ({ summary }) => {
  return (
    <section className="transaction-summary">
      <h2>Summary</h2>
      <div className="summary-stats">
        <div className="summary-stat">
          <p>Total transactions</p>
          <span><b>{summary.totalTransactions}</b></span>
        </div>
        <div className="summary-stat">
          <p>Total received</p>
          <span><b>{summary.totalReceived}</b></span>
        </div>
        <div className="summary-stat">
          <p>Total sent</p>
          <span><b>{summary.totalSent}</b></span>
        </div>
      </div>
    </section>
  );
};

export default TransactionSummary;

import React from "react";

const TransactionSummary = ({ summary }) => {
  return (
    <section className="transaction-summary">
      <h2>Summary</h2>
      <div className="summary-stats">
        <div className="summary-stat">
          <p>Total transactions:</p>
          <span>{summary.totalTransactions}</span>
        </div>
        <div className="summary-stat">
          <p>Total received:</p>
          <span>{summary.totalReceived}</span>
        </div>
        <div className="summary-stat">
          <p>Total sent:</p>
          <span>{summary.totalSent}</span>
        </div>
      </div>
    </section>
  );
};

export default TransactionSummary;
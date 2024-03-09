import React from "react";
import Summary from "../styles/summary.css";
import { useParams } from "react-router-dom";
const TransactionSummary = ({ props: { nodes, links } }) => {
  var summary = {
    totalTransactions: 0,
    totalSent: 0,
    totalReceived: 0
  };
  const params = useParams();
  const id = params.id;
  links.forEach(link => {
    summary.totalTransactions += 1;

    if (link.source === id) {
      summary.totalSent += +link.value; // Increase the sent value by the amount of link.value
    } else {
      summary.totalReceived += +link.value;
    }
  });
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

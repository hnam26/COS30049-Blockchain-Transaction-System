import React from "react";

const TransactionsTable = ({ transactions }) => {
  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Fee</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.transactionId}</td>
            <td>{transaction.sender}</td>
            <td>{transaction.receiver}</td>
            <td>{transaction.type}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.fee}</td>
            <td>{transaction.status}</td>
            <td>{transaction.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
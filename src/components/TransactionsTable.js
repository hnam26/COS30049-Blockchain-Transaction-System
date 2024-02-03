import React from "react";

const TransactionsTable = ({ transactions }) => {
  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Transaction</th>
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
            <td>{transaction.type}</td>
            <td>
              {/* Display both expense and income in the "Amount" field */}
              Expense: {transaction.expense}
              <br />
              Income: {transaction.income}
            </td>
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
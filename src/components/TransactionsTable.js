import React from "react";

const TransactionsTable = ({ props: { nodes, links } }) => {
  const sortLinks = [...links].sort((a, b) => a.block_timestamp - b.block_timestamp);
  return (
    <>
      <h2>Transactions History</h2>
      {/* Display the transactions in a table */}
      <table className="transactions-table">
        <thead>
          <tr>
            {/* <th></th> */}
            <th>Sender</th>
            <th>Receiver</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Gas</th>
            <th>Gas used</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortLinks.map((link, index) => (
            <tr key={index}>
              {/* <td>{link.id}</td> */}
              <td>{link.source}</td>
              <td>{link.target}</td>
              <td>{+link.value}</td>
              <td>{link.transaction_fee}</td>
              <td>{link.gas}</td>
              <td>{link.gas_used}</td>
              <td>{(() => {
                var time = new Date(link.block_timestamp * 1000);
                return time.toLocaleDateString();
              })()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionsTable;
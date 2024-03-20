import React from "react";
import "../../styles/transactionstable.css";
const TransactionsTableSke = () => {
    return (
        <>
            <h2>Transactions History</h2>
            {/* Display the transactions in a table */}
            <table className="transactions-table loading">
                <thead>
                    <tr>
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
                    <tr>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                    </tr>
                    <tr>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                    </tr>
                    <tr>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                    </tr>
                    <tr>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                        <td><div className="skeleton-box"></div></td>
                    </tr>
                </tbody>
            </table>
        </>

    );
};

export default TransactionsTableSke;
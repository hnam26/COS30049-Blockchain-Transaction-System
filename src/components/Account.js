import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionSummary from "./TransactionSummary";
import TransactionGraph from "./TransactionGraph";
import UserInfo from "./UserInfo";
import { calculateExpensesAndIncomes, findNodesByWalletAddress, transactionData, getTransactionDetails, getTransactionSummary } from "../data/transactionData";
import HandleRevenueError from "./ErrorHandler";
import accountcss from "../styles/accountcss.css";
const Account = () => {

    const params = useParams();
    const transData = transactionData();
    const [showWalletContent, setShowWalletContent] = useState(true);

    // Define state variables for node, transHistory, transData, summary, and transactions
    const [data, setData] = useState({ node: null, transHistory: null, summary: null, transactions: null });

    useEffect(() => {
        // Fetch new data here every time `params.id` changes
        const fetchData = async () => {
            const fetchedNode = findNodesByWalletAddress(params.id); // Fetch node information based on wallet address
            const fetchedTransHistory = calculateExpensesAndIncomes(params.id); // Calculate and fetch expenses and incomes
            const fetchedSummary = getTransactionSummary(params.id); // Fetch summary data
            const fetchedTransactions = getTransactionDetails(params.id, -1); // Fetch transactions data

            // Update state variables with the new data
            setData({ node: fetchedNode, transHistory: fetchedTransHistory, summary: fetchedSummary, transactions: fetchedTransactions });
        };

        fetchData();
    }, [params.id]);

    // Render the JSX based on the fetched data
    return (
        <>
            {data.node ? (
                <>

                    <UserInfo props={{ nodes: data.node, summary: data.summary }} />
                    <div className="userSelect">
                        <button className={"buttonToggle" + (showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(true)}>Wallet</button>
                        <button className={"buttonToggle" + (!showWalletContent ? " active" : "")} onClick={() => setShowWalletContent(false)}>Chart</button>
                    </div>
                    {showWalletContent ? (

                        <div style={{ width: "95%", padding: "0px 80px" }}>
                            <div className="chart-summary-frame">
                                <div className="bar">
                                    <BarChart props={data.transHistory} />
                                </div>
                                <div className="summary">
                                    <TransactionSummary summary={data.summary} />
                                </div>
                            </div>
                            <TransactionsTable transactions={data.transactions} />
                        </div>
                    ) : (
                        <>
                            <TransactionGraph data={transData} />
                        </>
                    )}
                </>
            ) : (
                // Render error handler component if node data is not available
                <HandleRevenueError />
            )}
        </>
    );
};
export default Account;

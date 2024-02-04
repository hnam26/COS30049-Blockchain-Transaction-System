import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionSummary from "./TransactionSummary";
import TransactionGraph from "./TransactionGraph";
import { calculateExpensesAndIncomes, findNodesByWalletAddress, transactionData, getTransactionDetails, getTransactionSummary } from "../data/transactionData";
import HandleRevenueError from "./ErrorHandler";
const Account = () => {

    const params = useParams();
    const transData = transactionData();

    // Define state variables for node, transHistory, transData, summary, and transactions
    const [data, setData] = useState({ node: null, transHistory: null, summary: null, transactions: null });

    useEffect(() => {
        // Fetch new data here every time `params.id` changes
        const fetchData = async () => {
            const fetchedNode = findNodesByWalletAddress(params.id);
            const fetchedTransHistory = calculateExpensesAndIncomes(params.id);
            const fetchedSummary = getTransactionSummary(params.id); // Fetch summary data
            const fetchedTransactions = getTransactionDetails(params.id); // Fetch transactions data

            // Update your state variables with the new data
            setData({ node: fetchedNode, transHistory: fetchedTransHistory, summary: fetchedSummary, transactions: fetchedTransactions });
        };

        fetchData();
    }, [params.id]);


    return (
        <>
            {data.node ? (
                <>
                    <BarChart props={data.transHistory} />
                    <TransactionSummary summary={data.summary} />
                    <TransactionsTable transactions={data.transactions} />
                    <div style={{ marginTop: "100px" }}>
                        <TransactionGraph data={transData} />
                    </div>
                </>
            ) : (
                <HandleRevenueError />
            )}
        </>
    );
};
export default Account;
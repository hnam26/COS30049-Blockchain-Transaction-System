import React from "react";
import { useParams } from "react-router-dom";
import BarChart from "./BarChart";
import TransactionsTable from "./TransactionsTable";
import TransactionSummary from "./TransactionSummary";
import TransactionGraph from "./TransactionGraph";
import { calculateExpensesAndIncomes, transactionData, findNodesByWalletAddress } from "../data/transactionData";
const Account = () => {
    const params = useParams();
    const wallet = params.id;
    const summary = {
        totalTransactions: 513,
        totalReceived: "21546 BTC",
        totalSent: "21546 BTC",
    };
    const transactions = [
        {
            transactionId: 'ABC123',
            type: 'Purchase',
            amount: '$100.00',
            fee: '$1.50',
            status: 'Completed',
            date: '2024-01-01'
        },
        {
            transactionId: 'DEF456',
            type: 'Withdrawal',
            amount: '$50.00',
            fee: '$2.00',
            status: 'Pending',
            date: '2024-01-02'
        },
        // Add more transaction objects as needed
    ];

    const transHistory = calculateExpensesAndIncomes(wallet);
    const transData = transactionData();
    const node = findNodesByWalletAddress(wallet);
    return (
        <>
            {node ? (
                <>
                    <BarChart props={transHistory} />
                    <TransactionSummary summary={summary} />
                    <TransactionsTable transactions={transactions} />
                    <div style={{ marginTop: "100px" }}>
                        <TransactionGraph data={transData} />
                    </div>

                </>
            ) : (
                <h1>There is no wallet address</h1>
            )}
        </>
    );
};
export default Account;
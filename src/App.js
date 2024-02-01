import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import BitcoinBalance from "./components/BitcoinBalance";
import TransactionsTable from "./components/TransactionsTable";
import TransactionSummary from "./components/TransactionSummary";
import BarChart from "./components/BarChart";
import Search from "./components/Search";
import { Outlet } from "react-router-dom";
const transactions = [
  // Add your transactions data here
];

const summary = {
  totalTransactions: 513,
  totalReceived: "21546 BTC",
  totalSent: "21546 BTC",
};

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div style={{ width: "50%" }}>
        <Search />
      </div>
      <Outlet />
      {/* <BitcoinBalance /> */}
      {/* <BarChart /> */}
      <TransactionSummary summary={summary} />
      <TransactionsTable transactions={transactions} />
    </div>
  );
};

export default App;
import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Search />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
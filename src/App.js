import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import { Outlet, useOutlet } from 'react-router-dom';

const App = () => {
  // Check if there are any child routes inside Outlet
  const outlet = useOutlet();

  return (
    <div className="App">
      <Navbar />
      <Search />
      {/* Conditionally render the div if there are no child routes */}
      {!outlet && <div style={{ height: '60vh' }} />}
      {/* Render the Outlet */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

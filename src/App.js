// We are group 3.1 - NST 
// Team members:
// 1. Nguyen Chanh Hoai Nam - 104195191
// 2. Dinh Xuan Sinh - 104180692
// 3. Le Quang Thien - 104226017



import React from 'react';
import './styles/app.css';
import './styles/error.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import Error from './components/ErrorPage';
import { Outlet, useOutlet } from 'react-router-dom';
const App = ({ props }) => {
  // Check if there are any child routes inside Outlet
  const outlet = useOutlet();
  // console.log(props?.error);
  return (
    <div className="App">
      <Navbar />
      <Search />
      {/* Conditionally render the div if there are no child routes */}
      {!outlet && !props?.error ? <div style={{ height: '60vh' }} /> : <></>}
      {/* Render the Outlet */}
      <Outlet />
      {props?.error ? <Error props={{ status: '404' }} /> : <></>}
      <Footer />
    </div>
  );
};

export default App;

// We are group 3.1 - NST 
// Team members:
// 1. Nguyen Chanh Hoai Nam - 104195191
// 2. Dinh Xuan Sinh - 104180692
// 3. Le Quang Thien - 104226017



import React from 'react';
import './styles/app.css';
import './styles/error.css';
import Navbar from './components/common/Navbar';
import Search from './components/Home/components/Account/components/Search/Search';
import Footer from './components/common/Footer';
import Error from './components/common/ErrorPage';
import { Outlet, useOutlet } from 'react-router-dom';
const App = ({ props }) => {
  // Check if there are any child routes inside Outlet
  const outlet = useOutlet();
  // console.log(props?.error);
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;

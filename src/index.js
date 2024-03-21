import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Error from './components/common/ErrorPage';
import Home from './components/Home/Home';
import Account from './components/Home/components/Account/Account';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='addresses' element={<Home />}>
            <Route path=':id' element={<Account />} />
          </Route>
          <Route path='contact' element={<>Contact</>} />
          <Route path='about' element={<>About us</>} />
        </Route>
        <Route path='*' element={<Error props={{ status: "404" }} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

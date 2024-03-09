import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Account from './components/Account';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route key="account" path='/addresses/:id' element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrouwseRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrouwseRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrouwseRouter>
  </React.StrictMode>
);

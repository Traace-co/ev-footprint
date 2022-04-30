import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { About } from './about/About';
import App from './App';
import './index.css';
import { Methodology } from './methodology/Methodology';
import { routes } from './navigation/routes';
import reportWebVitals from './reportWebVitals';
import { LandingPage } from './simulator/landingPage/LandingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<App />}>
          <Route path={routes.pathnames.simulator} element={<LandingPage />} />
          <Route path={routes.pathnames.about} element={<About />} />
          <Route path={routes.pathnames.methodology} element={<Methodology />} />
          <Route index element={<Navigate to={routes.pathnames.simulator} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

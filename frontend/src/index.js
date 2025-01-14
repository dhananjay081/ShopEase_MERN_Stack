import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App'; // App without router
import { Provider } from "react-redux";
import store from "./store";
import router from "./Route/route"; // Import router
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { RouterProvider } from 'react-router-dom'; // RouterProvider moved here

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      {/* Wrap everything in RouterProvider */}
      <RouterProvider router={router} />
    </AlertProvider>
  </Provider>
);

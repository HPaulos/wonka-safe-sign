import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDSiFXTxBdOAfzhgZg-CmSGwaaQBiDX1cg",
  authDomain: "wonka-safe-sign.firebaseapp.com",
  projectId: "wonka-safe-sign",
  storageBucket: "wonka-safe-sign.appspot.com",
  messagingSenderId: "665744305406",
  appId: "1:665744305406:web:aef51df25f0d27d3bf09af",
  measurementId: "G-KFP7NG8E5T"
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// add the analytics to the window object
window.analytics = analytics;
reportWebVitals();

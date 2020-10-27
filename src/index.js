<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
=======
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> 8376f27f879eba2e4c75e57688692464a3e1837a

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
<<<<<<< HEAD
  document.getElementById('root')
=======
  document.getElementById("root")
>>>>>>> 8376f27f879eba2e4c75e57688692464a3e1837a
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

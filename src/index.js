import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import Reducer from "./Store/Reducer";
import thunk from "redux-thunk";
// import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(Reducer, applyMiddleware(thunk));

ReactDOM.render(
  // remove strict mode later
      <Provider store={store}>
        <BrowserRouter>
         <App /> 
        </BrowserRouter>
      </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {reducer} from "./reducer"
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducer, applyMiddleware(thunk)); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />

    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


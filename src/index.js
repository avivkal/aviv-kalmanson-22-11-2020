import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { store } from './Store/store'
import { Provider } from 'react-redux'
import axios from 'axios'
import { URL } from './Constants/const'
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

axios.defaults.baseURL = URL;

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
  ,
  document.getElementById('root')
);


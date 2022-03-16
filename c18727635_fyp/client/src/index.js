import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {setupAxios} from './refresh';

setupAxios();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);



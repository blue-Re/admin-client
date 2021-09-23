import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';
// 每次进来都要读取localStorage的值
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);


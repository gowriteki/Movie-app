import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; //.slash is local file slash is adefault path
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
//document -index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App /> 
    </BrowserRouter>
                              
  </React.StrictMode>
);
 // we calling the function
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function f1(){
  return 10;
}
f1();//javascript function calling
<f1></f1>//react js

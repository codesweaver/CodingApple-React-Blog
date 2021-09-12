import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

function alertReducer(state = true, actions) {
  if (actions.type === "close") {
    return false;
  }
  return state;
}

let defaultState = [    
  {productId: 0, productName: "Freaking Awesome Shoes", productQuantity: 2},
  {productId: 1, productName: "It's no reason to buy Shoes", productQuantity: 10},
  {productId: 2, productName: "Not bad Shoes", productQuantity: 5}
];

function reducer(state = defaultState, actions) {
  let tmpArr = [...state];

  if (actions.type === "plus") {  
    tmpArr[actions.id].productQuantity++;

  } else if (actions.type === "minus") {
    tmpArr[actions.id].productQuantity--;

  } else if (actions.type === "add") {
    let idx = tmpArr.findIndex((a)=>{return a.productId === actions.payload.productId});
    if (idx > 0) {
      tmpArr[idx].productQuantity++;
  
    } else {
      tmpArr.push(actions.payload);
    }

  }

  return tmpArr;
}

let store = createStore(combineReducers({reducer, alertReducer}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

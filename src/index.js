import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './store/reducers';

import './index.css';

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

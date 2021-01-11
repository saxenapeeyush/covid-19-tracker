import React from 'react';
import { BrowserRouter , Route  } from 'react-router-dom';

import Home from './views/Home';
import States from './views/States';

import './App.css';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Route path = "/" exact component = {Home}/>

        <Route path = "/state/:stateName" component = {States}/>

      </BrowserRouter>

    </div>
  );
}

export default App;

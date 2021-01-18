import React from 'react';
import { BrowserRouter , Route , Switch  } from 'react-router-dom';

import Home from './views/Home';
import States from './views/States';
import Error from './common/Error';

import './App.css';

const App = () => {

  return (
    <div className="App">

      <BrowserRouter>

        <Switch>

        <Route path = "/" exact component = {Home}/>

        <Route exact path = "/state/:stateName" component = {States}/>

        <Route component = {Error}/>

        </Switch>

      </BrowserRouter>

    </div>
  );
}

export default App;

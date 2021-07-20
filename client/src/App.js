import React from 'react'
import { Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">

      <Route
        path='/'
        component={NavBar}
      />

      <Route
        exact path='/'
        component={Home}
      />

      <Route
        path='/'
        component={Footer}
      />

    </div>
  );
}

export default App;

import React from 'react'
import { Route } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import FindParkings from './components/FindParkings/FindParkings'
import ParkingModal from './components/ParkingModal/ParkingModal'
import Favourites from './components/Favourites/Favourites'

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
        path='/search'
        component={FindParkings}
      />

      <Route
        path='/search/:id'
        component={ParkingModal}
      />

      <Route
        path='/favourites'
        component={Favourites}
      />

      <Route
        path='/'
        component={Footer}
      />

    </div>
  );
}

export default App;

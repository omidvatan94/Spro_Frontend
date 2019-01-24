import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { Switch, Route, Router} from 'react-router-dom';
import MenuContainer from './MenuContainer'
import MapContainer from './MapContainer'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MenuContainer />
      </div>
    );
  }
}



export default App;

import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import EventResults from './components/eventResults/eventResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <EventResults />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
// Components
import Navbar from './components/navbar/navbar';
import EventResults from './components/eventResults/eventResults';
import CreateEvent from './components/createEvent/createEvent';

// Firebase config
import {firebase_config} from './firebase.js';
import firebase from 'firebase/app';
import 'firebase/database'

class App extends Component {
  constructor(props) {
    super(props)

    // Initialize Firebase
    this.app = firebase.initializeApp(firebase_config);
    this.db = this.app.database().ref().child("events");

    // Create Event - Add to Database
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillMount(){}

  createEvent(event_info){
    console.log(event_info)
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <EventResults />
        <CreateEvent createEvent={this.createEvent} />
      </div>
    );
  }
}

export default App;

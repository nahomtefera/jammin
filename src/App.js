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

    this.state ={
      // Events
      events: [],
    }

    // Initialize Firebase
    this.app = firebase.initializeApp(firebase_config);
    this.db = this.app.database().ref().child("events");

    // Create Event - Add to Database
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillMount(){
    let events = this.state.events;
    let self = this;
    // We will update state every time an event is created
    this.db.on("child_added", snap => {
      let snap_val = snap.val();

      events.push({
        title: snap_val.title,
        location: snap_val.location,
        date: snap_val.date,
        time: snap_val.time
      });

      self.setState({
        events
      })
    })

  }

  // Adds event to firebase database
  createEvent(event_info){
    // Add Firebase call to push event to database
    this.db.push().set({
      title: event_info.title,
      location: event_info.location,
      date: event_info.date,
      time: event_info.time
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <EventResults events={this.state.events} />
        <CreateEvent createEvent={this.createEvent} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import EventResults from './components/eventResults/eventResults';
import {firebase_config} from './firebase.js';
import firebase from 'firebase/app';
import 'firebase/database'

class App extends Component {
  constructor(props) {
    super(props)

    this.app = firebase.initializeApp(firebase_config);
    this.db = this.app.database().ref().child("events");
  }

  componentWillMount(){
    this.db.push().set({
      title: "first database entry"
    })
  }

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

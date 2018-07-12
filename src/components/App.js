import React, { Component } from 'react';
import './App.css';
// Components
import Navbar from './navbar/navbar';
import EventResults from './eventResults/eventResults';
import CreateEvent from './createEvent/createEvent';
import LandingPage from './landingPage/landingPage';
// React-router
import { BrowserRouter, Route } from 'react-router-dom';
// Firebase 

// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      //SignedUser
      // isSigned: false,
      // Events
      events: [],
    }

    // Create Event - Add to Database
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillMount(){

  }

  // Adds event to firebase database
  createEvent(event_info){
    // Add Firebase call to push event to database
    
  }

  render() {
    return (
      <BrowserRouter> 
        <div className="App">
          <Navbar />
          <hr />
          {/* Main Page that users and guests will see without signing-in */}
          <Route
            exact path="/"
            render={() => 
              <LandingPage/>
          }/>
          {/* Home page that would appear when a user signs-in */}
          <Route
            exact path="/home"
            render={(props) =>  
              <div>
                <EventResults {...props} events={this.state.events} />
                <CreateEvent {...props} createEvent={this.createEvent} />
              </div>  
          }/>
          {/* Sign-in page */}
          <Route
            exact path="/sign-in"
            render={(props) => 
              // We might activate it afterwards
              // <StyledFriebaseAuth {...props} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
              <div>Sign-in goes here</div>
          }/>

        </div>
      </BrowserRouter>
        
    );
  }
}

export default App;

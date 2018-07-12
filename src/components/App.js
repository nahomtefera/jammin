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
import './firebase/';
import firebase from 'firebase';

// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      // Loader
      loading: "true",
      // SignedUser
      authUser: null,
      // Events
      events: [],
    }
    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.setState({
            authUser: true
          })
        }
      }
    }
    // Create Event - Add to Database
    this.createEvent = this.createEvent.bind(this);
  }

  componentWillMount(){
    var self = this;

    setTimeout(function(){ 
      self.setState({loading:false})
    }, 1500);

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  // Adds event to firebase database
  createEvent(event_info){
    // Add Firebase call to push event to database
    
  }

  render() {
    // Loader
    if (this.state.loading === 'true') {
      return (
        <div className="loader-container">
          <div className="loader">Loading...</div>
        </div>
      )
    }
    // App
    return (
      <BrowserRouter> 
        <div className="App">
          <Navbar authUser={this.state.authUser}/>
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
            render={(props) => {
              return (
                // Only show sign-in if user is not authenticized
                this.state.authUser ? ""
                : 
                <StyledFriebaseAuth {...props} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
              )
            }
              
          }/>

        </div>
      </BrowserRouter>
        
    );
  }
}

export default App;

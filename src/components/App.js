import React, { Component } from 'react';
import './App.css';
// Components
import Navbar from './navbar/navbar';
import EventResults from './eventResults/eventResults';
import CreateEvent from './createEvent/createEvent';
import LandingPage from './landingPage/landingPage';
// React-router
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
// Firebase 
import './firebase/';
import firebase from 'firebase';
import { db } from './firebase/';


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
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (data) => {
          // If the user signing-in is a new user
          // We will create add them to the firebase database
          if(data.additionalUserInfo.isNewUser === true) {
            db.doCreateUser(data.user.uid, data.user.displayName, data.user.email, data.user.photoURL)
          } 
        
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
    // Loader
    var self = this;
    setTimeout(function(){ 
      self.setState({loading:false})
    }, 1000);
    // 
  }

  componentDidMount() {
    // Everytime user signs-in or out
    // We will update the state
    // Set it to null if users signs-out
    // And set it to user if user signs-in
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
            render={(props) => {
              // If user has NOT signed-in
              // Going to /home page will redirect to landing page
              if (this.state.authUser === null) {
                return <Redirect to='/' />
              }
              return(
                <div>
                  <EventResults {...props} events={this.state.events} />
                  <CreateEvent {...props} createEvent={this.createEvent} />
                </div>  
              )
            } 
          }/>

          {/* Sign-in page */}
          <Route
            exact path="/sign-in"
            render={(props) => {
              // If user has already signed-in
              // Going to /sign-in page will redirect to landing page
              if (this.state.authUser !== null) {
                return <Redirect to='/' />
              }
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

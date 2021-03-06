import React, { Component } from 'react';
import './App.css';
// Components
import Navbar from './navbar/navbar';
import Account from './account/account';
import EventResults from './eventResults/eventResults';
import CreateEvent from './createEvent/createEvent';
import LandingPage from './landingPage/landingPage';
import EventPage from './eventPage/eventPage';
// React-router
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
// Firebase 
import firebase from 'firebase/app';
import './firebase/';
import { db } from './firebase/';


// Firebase auth ui
import StyledFriebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      // Loader
      loading: "false",
      // SignedUser
      authUser: null,
      userInfo: null,
      firstLogIn: 'false',
      // Is User Creating Event
      creatingEvent: false,
      // Events
      events: [],
      toggleSignIn: false
    }
    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: (data) => {
          this.toggleSignIn()
          // If the user signing-in is a new user
          // We will add them to the firebase database
          if(data.additionalUserInfo.isNewUser === true) {
            db.doCreateUser(data.user.uid, data.user.displayName, data.user.email, data.user.photoURL)
          }
        },
        signInFailure: function(error) {
          // Some unrecoverable error occurred during sign-in.
          // Return a promise when error handling is completed and FirebaseUI
          // will reset, clearing any UI. This commonly occurs for error code
          // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
          // occurs. Check below for more details on this.
          alert(error)
        }
      },
      signInFlow: "popup"
    }
    // Create Event - Add to Database
    this.createEvent = this.createEvent.bind(this);
    this.toggleCreateEventWindow = this.toggleCreateEventWindow.bind(this);
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.uploadEventImg = this.uploadEventImg.bind(this);
  }

  componentWillMount(){
    // Loader
    // var self = this;
    // setTimeout(function(){ 
    //   self.setState({loading:false})
    // }, 1500);

    // If the user is authenticated we can get all the events
    let events = []
    let userInfo = null;

    if(this.state.authUser !== "null"){
      db.getChildEvents().on("child_added", snap=>{
        events.unshift(snap.val())
      });
    }

    this.setState({events})
  }

  componentDidMount() {
    // Everytime user signs-in or out
    // We will update the state
    // Set it to null if users signs-out
    // And set it to user if user signs-in
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? (
            firebase.database().ref(`users/${authUser.uid}`).once('value').then(snap=>{
              let userInfo = snap.val();
              this.setState(() => ({ authUser: authUser, userInfo: userInfo,  firstLogIn: "true" }))
            })
          
          )
        : this.setState(() => ({ authUser: null }));
    });
  }

  toggleCreateEventWindow(){
    this.setState({creatingEvent: !this.state.creatingEvent})
  }

  toggleSignIn(){
    this.setState({toggleSignIn: !this.state.toggleSignIn})
  }
  // Adds event to firebase database
  createEvent(event){
    // Add Firebase call to push event to database
    // doCreateEvent = (id, uid, title, location, address, date, time, description, imageURL, members)
    db.doCreateEvent(event.id, event.uid, event.title, event.location, event.address, event.date, event.time, event.description, "", [""])
    .then(()=>{
      // If the user doesn't upload a picture, let's refresh
      if(event.uploadedImg === false) {
        // window.location.reload()
        let events = []
        db.getChildEvents().on("child_added", snap=>{
          events.unshift(snap.val())
        });
        this.setState({events})
      }
      // Send IMG file to method that will upload it to storage
      this.uploadEventImg(event.uploadedImg, event.id);
    })
    // Close create event modal
    this.toggleCreateEventWindow();
  }
  // Everytime a user creates an event, we will upload the image for that event
  // Once the upload is succesfull we will add the url for that image to the corresponding event
  uploadEventImg(file, event_id) {
    // Create Storage Ref
    let storageRef = firebase.storage().ref('images/events/' + event_id)
    // Upload File
    let uploadTask = storageRef.put(file)

    let self = this;
    console.log(file)
    // Method that will check the percentage of the upload
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      self.setState({loading: "loading-event"})
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        // Once the image is uploaded, We will update the event to add the imageURL
        firebase.database().ref().child('/events/' + event_id)
        .update({ imageURL: downloadURL})
        .then(()=>{
          // Reload page to be able to see the picture uploaded
          let events = []
          db.getChildEvents().on("child_added", snap=>{
            events.unshift(snap.val())
          });
          this.setState({events})
        })
      });
    });
  }

  render() {
    // App
    return (
      <BrowserRouter> 
        <div className="App">

          {/* LOADERS */}
            {/* Loader for intro */}
          <div className={this.state.loading === 'true' ? "loader-container" : "hide"}>
            <div className="loader-wrapper">
              <h1 className="loader-text"> </h1>
              <div className="loader">Loading...</div>
            </div>
            
          </div>
            {/* Loader for event creation */}
          <div className={this.state.loading === 'loading-event'? "event-loader-container" : "hide"}>
            <div className="loader-wrapper">
              <h1 className="event-loader-text">Uploading Event . . .</h1>
              <div className="event-loader">Loading...</div>
            </div>
            
           </div>  
          {/* Main Page that users and guests will see without signing-in */}
          <Route
            
            exact path="/"
            render={() => {
              // if (this.state.firstLogIn === "true") {
              //   return <Redirect to='/events' />
              // }
              return(
              <div className="landing_page">
                <Navbar toggleSignIn={this.toggleSignIn} isLandingPage={true} authUser={this.state.authUser}/>
                <LandingPage/>
                {/* {
                  this.state.toggleSignIn === true
                    ? 
                      <div>
                        <div onClick={this.toggleSignIn} className="firebase_ui-outer-container"></div>
                        <StyledFriebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                      </div>
                    : null
                } */}
                {
                  this.state.toggleSignIn === true
                    ? 
                      <div className="sign-in-container">
                        <div onClick={this.toggleSignIn} className="firebase_ui-outer-container"></div>
                        <StyledFriebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                      </div>
                    : null
                }                
              </div>
              )}
            }
          />

          {/* Account Page to edit account info*/}
          <Route
            exact path="/account"
            render={(props) => {
              // If user has NOT signed-in
              // Going to /home page will redirect to landing page
              if (this.state.authUser === null) {
                return <Redirect to='/' />
              }
              return(
                <div>
                  <Navbar authUser={this.state.authUser}/>
                  <Account user={firebase.auth().currentUser}/>
                </div>
              )
            } 
          }/>

          {/* Home page that would appear when a user signs-in */}
          <Route
            exact path="/events"
            render={(props) => {
              // If user has NOT signed-in
              // Going to /home page will redirect to landing page
              if (this.state.authUser === null) {
                return <Redirect to='/' />
              }
              return(
                <div>
                  <Navbar authUser={this.state.authUser}/>
                  {/* Create Event Button */}
                  <div className="create-event-button-container"> 
                    <button onClick={this.toggleCreateEventWindow} className={this.state.creatingEvent 
                      ? "hide" 
                      : "toggle-create-event-window"}>Event +</button>
                  </div>
                  {/* Modal to Create Events */}
                  {this.state.creatingEvent !== false 
                    ? <CreateEvent {...props} toggleWindow={this.toggleCreateEventWindow} createEvent={this.createEvent} /> 
                    : ""
                  }
                  {/* S H O W    A L L    E V E N T S */}
                  <EventResults {...props} currentUserInfo={this.state.userInfo} events={this.state.events} />
                </div>  
              )
            } 
          }/>

          {/* Event Route that will display all information for selected events */}
          <Route
            path="/event/:id"
            render={(props) => {
              // If user has NOT signed-in
              // Going to /home page will redirect to landing page
              if (this.state.authUser === null) {
                return <Redirect to='/' />
              }
              return(
                <div>
                  <Navbar isEventPage={true} authUser={this.state.authUser}/>
                  <EventPage currentUser={this.state.userInfo} props={props}/>
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
                <div> 
                  <Navbar authUser={this.state.authUser}/>
                  <StyledFriebaseAuth {...props} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                </div>
              )
            }
              
          }/>

        </div>
      </BrowserRouter>
        
    );
  }
}

export default App;

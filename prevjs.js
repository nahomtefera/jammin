constructor(props) {
    super(props)

    this.state ={
      //SignedUser
      // isSigned: false,
      // Events
      events: [],
    }
    // Config for firebaseAuthUi - Authentification
    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          this.setState({
            isSigned: true
          })
        }
      }
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
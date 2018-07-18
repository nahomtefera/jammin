import React, {Component} from 'react';
import './eventPage.css';
import firebase from 'firebase/app';
import '../firebase/';

class EventPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            
        }
    }

    componentWillMount(){
        let event_id = this.props.props.match.params.id;

        // We will call firebase to get all the info for the current event
        // Then we will pass the values of the event to the state
        firebase.database().ref(`events/${event_id}`).once('value').then(snap=>{
            this.setState(snap.val())
        });
    }
    render(){
        return(
            <div className="event-page-container">
                We will render the event details here
            </div>
        )
    }
}

export default EventPage;
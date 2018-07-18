import React, {Component} from 'react';
import './eventPage.css';
import firebase from 'firebase/app';
import '../firebase/';

class EventPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            event: {},
            event_owner: {}
        }
    }

    componentWillMount(){
        let event_id = this.props.props.match.params.id; {/* Event ID*/}
        let event_info = {}
        let user_info = {}
        // We will call firebase to get all the info for the current event
        // Then we will pass the values of the event to the state
        firebase.database().ref(`events/${event_id}`).once('value').then(snap=>{
            event_info = snap.val()
        })
        // Once we have the event info we will use the uid of the even
        // And we will access firebase again to get the event_owner info
        .then(()=>{
            firebase.database().ref(`users/${event_info.uid}`).once('value').then(snap=>{
                user_info = snap.val()
            })
            // Once we have all the info regarding the event 
            // We will update the state with the info
            .then(()=>{
                this.setState({
                    event: event_info,
                    event_owner: user_info
                })
            })
        })
        

    }
    render(){
        // event: date, description, id, imageURL, location, time, title, uid
        // user: name, username, photoURL
        return(
            <div className="event-page">
            
                <div className="event-page-background"></div>

                <div className="event-page-container">
                    <div className="event-page-header">
                        <span className="event-page-header-title">{this.state.event.title} </span>
                        at
                        <span className="event-page-header-location"> {this.state.event.location}</span>
                    </div>

                    <div className="event-info">
                        
                        <div className="event-date">{this.state.event.date}</div>
                        <div className="event-time">{this.state.event.time}</div>

                        <div className="event-description">
                            <span className="event-description-title">Description</span>
                            <p className="event-description-text">{this.state.event.description}</p>
                        </div>
                    </div>

                    <div className="event-user-info">
                        <div className="user-name">{this.state.event_owner.name}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default EventPage;
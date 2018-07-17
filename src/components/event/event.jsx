import React, {Component} from 'react';
import './event.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';

    
// doCreateEvent = (id, uid, title, location, date, time, description, imageURL)


class Event extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            event_owner: {}
        }
    }

    componentWillMount(){
        let new_event_owner;

        firebase.database().ref(`users/${this.props.eventInfo.uid}`).once('value').then(snap=>{
            // console.log(snap.val())
            this.setState({event_owner: snap.val()})

        });

    }

    render() {
        return (
            <div className="event-card-container">
                <div className="event-card-owner-info">
                    <img className="event-card-owner-img" src={this.state.event_owner.photoURL} alt="profile pic"/>
                    <span className="event-card-owner-name">{this.state.event_owner.name}</span>
                </div>
                
                <div className="event-card-image-info-container">
                    <div className="event-card-image">
                        <img className="event-card-image-item" src={this.props.eventInfo.imageURL != "" ? `${this.props.eventInfo.imageURL}` : "https://cdn2.iconfinder.com/data/icons/xomo-basics/128/document-06-512.png"} alt="event pic"/>
                    </div>

                    <div className="event-card-info-container">
                        <ul className="event-card-info-list">
                            <li><span className="event-info-item">{this.props.eventInfo.title}</span> at <span className="event-info-item">{this.props.eventInfo.location}</span></li>
                            <li><span className="event-info-item">{this.props.eventInfo.date}</span></li>
                            <li><span className="event-info-item">{this.props.eventInfo.time}</span></li>
                        </ul>
                    </div>
                </div>

                <p className="event-card-description-container">{this.props.eventInfo.description}</p>

            </div>
        )
    }
}

export default Event;
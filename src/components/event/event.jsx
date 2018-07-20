import React, {Component} from 'react';
import './event.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';
import {Link} from 'react-router-dom';

    
// doCreateEvent = (id, uid, title, location, date, time, description, imageURL)


class Event extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            event_owner: {},
            eventJoined: "false"
        }

        this.joinEvent = this.joinEvent.bind(this);
        this.leaveEvent = this.leaveEvent.bind(this);
    }

    componentWillMount(){
        let event_owner;
        let currentUserId = firebase.auth().currentUser;

        firebase.database().ref(`users/${this.props.eventInfo.uid}`).once('value').then(snap=>{
            // console.log(snap.val())
            event_owner = snap.val()
        }).then(()=>{
            this.props.eventInfo.members != undefined 
                ? this.props.eventInfo.members.map(member => {
                    if(member === currentUserId) {
                        this.setState ({
                            event_owner: event_owner,
                            eventJoined: "true"
                        })
                    }
                })
                : this.setState ({
                    event_owner: event_owner
                })
        });

    }

    joinEvent(){
        this.setState({eventJoined: "true"})
    }

    leaveEvent(){
        this.setState({eventJoined: "false"})
    }

    render() {
        return (
            <div className="event-card-container">
                <div className="event-card-owner-info">
                    <img className="event-card-owner-img" src={this.state.event_owner.photoURL != null ? this.state.event_owner.photoURL : "https://goo.gl/cJ1cte"} alt="profile pic"/>
                    <span className="event-card-owner-name">{this.state.event_owner.name}</span>
                </div>
                
                <div className="event-card-image-info-container">
                    {/* We will leave the Event image out for now */}
                    {/* <div className="event-card-image">
                        <img className="event-card-image-item" src={this.props.eventInfo.imageURL != "" ? `${this.props.eventInfo.imageURL}` : "https://cdn2.iconfinder.com/data/icons/xomo-basics/128/document-06-512.png"} alt="event pic"/>
                    </div> */}
                    <div className="event-card-time">
                        <span className="">{this.props.eventInfo.time}</span>
                    </div>
                    <div className="event-card-info-container">
                        <ul className="event-card-info-list">
                            <li><span className="event-info-item event-title">{this.props.eventInfo.title}</span> at <span className="event-info-item">{this.props.eventInfo.location}</span></li>
                            <li><span className="event-info-item event-date">{this.props.eventInfo.date}</span></li>
                            {/* <li></li> */}
                        </ul>
                    </div>
                </div>

                {/* <p className="event-card-description-container">{this.props.eventInfo.description}</p> */}
                <div className="event-card-handlers">

                    {this.state.eventJoined == "false" 
                        ? <div className="event-card-handler-icon join-event" onClick={this.joinEvent}>Join Event</div>
                        : <div className="event-card-handler-icon leave-event" onClick={this.leaveEvent}>Leave Event</div>
                    }

                    <div className="view-full-event"><Link to={`/event/${this.props.eventInfo.id}`}>Open Event</Link></div>
                </div>
            </div>
        )
    }
}

export default Event;
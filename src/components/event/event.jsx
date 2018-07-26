import React, {Component} from 'react';
import './event.css';
import firebase from 'firebase/app';
import '../firebase/';
import {Link} from 'react-router-dom';

    
// doCreateEvent = (id, uid, title, location, date, time, description, imageURL)


class Event extends Component {
    
    constructor(props){
        super(props);

        let currentUserId = firebase.auth().currentUser.uid;
        let eventMembers = this.props.eventInfo.members

        if(eventMembers.includes(currentUserId)) {
            this.state = {
                event_owner: {},
                eventJoined: "true",
                currentUserId: currentUserId
            }
        } else {
            this.state = {
                event_owner: {},
                eventJoined: "false",
                currentUserId: currentUserId
            }
        }
        

        this.joinEvent = this.joinEvent.bind(this);
        this.leaveEvent = this.leaveEvent.bind(this);
    }

    componentWillMount(){
        let event_owner;
        firebase.database().ref(`users/${this.props.eventInfo.uid}`).once('value').then(snap=>{
            event_owner = snap.val()
        }).then(()=>{
            this.setState({
                event_owner: event_owner
            })
        })
    }

    joinEvent(){
        let eventMembers = this.props.eventInfo.members;
        let currentEventId = this.props.eventInfo.id;
        let eventsUserGoing;
        this.props.currentUserInfo.eventsGoing 
            ? eventsUserGoing = this.props.currentUserInfo.eventsGoing
            : eventsUserGoing = []

        // We will use the includes() method to check if the current user id 
        // Is inside the members array of the event
        if(!eventMembers.includes(this.state.currentUserId)) {
            // If the uid is not inside eventMembers we will push it and update firebase
            eventMembers.push(this.state.currentUserId)

            firebase.database().ref().child('/events/' + this.props.eventInfo.id)
            .update({ members: eventMembers}).then(()=>{
                eventsUserGoing.push(currentEventId);

                // We will add the event id to the array eventsGoing in the userInfo
                firebase.database().ref().child('/users/' + this.state.currentUserId)
                .update({ eventsGoing: eventsUserGoing})

                // We call updateEvents() to update the state on parent component
                this.setState({eventJoined: "true"}, ()=>{this.props.updateEvents()});
            });
        } else {
            // User has already joined this event
            return
        }
    }

    leaveEvent(){
        let eventMembers = this.props.eventInfo.members;
        let memberIndex = eventMembers.indexOf(this.state.currentUserId) 
        // 
        let eventsUserGoing = this.props.currentUserInfo.eventsGoing;
        let eventGoingIndex = eventsUserGoing.indexOf(this.props.eventInfo.id)

        // If memberIndex === -1 it means the uid was not found in event members
        // If it's different than -1 we will get the index and remove the item from eventMembers 
        // Then we will update firebase
        if(memberIndex !== -1) {
            eventMembers.splice(memberIndex, 1);
            eventsUserGoing.splice(eventGoingIndex, 1);

            firebase.database().ref().child('/events/' + this.props.eventInfo.id)
                .update({ members: eventMembers}).then(()=>{

                    firebase.database().ref().child('/users/' + this.state.currentUserId)
                    .update({ eventsGoing: eventsUserGoing})
                    // We call updateEvents() to update the state on parent component
                    this.setState({eventJoined: "false", eventsGoing: eventsUserGoing},()=>{this.props.updateEvents()})
                })
        } else {
            console.log("user is not member of this event")
            return
        }
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

                    {this.state.eventJoined === "false" 
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
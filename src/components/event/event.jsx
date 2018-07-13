import React, {Component} from 'react';
import './event.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';

    
// doCreateEvent = (id, uid, title, location, date, time, description, imageURL)


class Event extends Component {

    componentWillMount(){
        firebase.database().ref('/users/' + this.props.uid).once('value').then(function(snapshot) {
           console.log(snapshot)
        });
    }

    render() {
        return (
            <div>
                <ul>
                    <li><span>{this.props.eventInfo.title}</span></li>
                    <li><span>{this.props.eventInfo.location}</span></li>
                    <li><span>{this.props.eventInfo.date}</span></li>
                    <li><span>{this.props.eventInfo.time}</span></li>
                    <li><span>{this.props.eventInfo.description}</span></li>

                </ul>
            </div>
        )
    }
}

export default Event;
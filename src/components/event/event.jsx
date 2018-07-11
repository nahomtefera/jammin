import React, {Component} from 'react';
import './event.css';

class Event extends Component {
    render() {
        return (
            <div>
                This is an Event
                <ul>
                    <li><span>{this.props.eventInfo.title}</span></li>
                    <li><span>{this.props.eventInfo.location}</span></li>
                    <li><span>{this.props.eventInfo.time}</span></li>
                    <li><span>{this.props.eventInfo.atendees}</span></li>
                </ul>
            </div>
        )
    }
}

export default Event;
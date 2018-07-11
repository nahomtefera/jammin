import React, {Component} from 'react';
import './event.css';

class Event extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><span>{this.props.eventInfo.title}</span></li>
                    <li><span>{this.props.eventInfo.location}</span></li>
                    <li><span>{this.props.eventInfo.date}</span></li>
                    <li><span>{this.props.eventInfo.time}</span></li>
                </ul>
            </div>
        )
    }
}

export default Event;
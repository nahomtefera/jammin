import React, {Component} from 'react';
import Event from '../event/event';
import './eventResults.css';

class EventResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventResults: [
                {
                    title: "jammin in the park",
                    location: "union square",
                    time: "10:30",
                    atendees: "just me"
                },
                {
                    title: "jammin in the park",
                    location: "union square",
                    time: "10:30",
                    atendees: "just me"
                },
                {
                    title: "jammin in the park",
                    location: "union square",
                    time: "10:30",
                    atendees: "just me"
                },
                {
                    title: "jammin in the park",
                    location: "union square",
                    time: "10:30",
                    atendees: "just me"
                }
            ]
        }
    }

    render() {
        return (
            <div>
                {/* loop through eventResults and render every event */}
                {
                    this.state.eventResults.map(event => {
                        return (
                            <Event eventInfo={event} />
                        )
                    })
                }
            </div>
        )
    }
}

export default EventResults;
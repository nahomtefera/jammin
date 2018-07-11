import React, {Component} from 'react';
import Event from '../event/event';
import './eventResults.css';

class EventResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventResults: [
                {
                    title: "",
                    location: "",
                    time: "",
                    atendees: ""
                },
            ]
        }
    }

    render() {
        return (
            <div>
                {/* loop through eventResults and render every event */}
                {
                    this.state.eventResults.map((event, index) => {
                        return (
                            <Event key={index} eventInfo={event} />
                        )
                    })
                }
            </div>
        )
    }
}

export default EventResults;
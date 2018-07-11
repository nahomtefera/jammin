import React, {Component} from 'react';
import Event from '../event/event';
import './eventResults.css';

class EventResults extends Component {

    render() {
        return (
            <div>
                {/* loop through events passed as props and render every event */}
                {
                    this.props.events.map((event, index) => {
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
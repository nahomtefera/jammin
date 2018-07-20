import React, {Component} from 'react';
import Event from '../event/event';
import moment from 'moment';
import './eventResults.css';

class EventResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allEvents: [],
            eventsToday: [],
            showEvents: "show-all-events"
        }

        this.changeFilter = this.changeFilter.bind(this);
    }

    componentWillMount(){
        let today = moment().format("dddd, MMMM DD YYYY")
        let eventsToday = [];
        let allEvents = [];
        
        this.props.events.map((event)=>{
            let date = event.date;

            allEvents.push(event);

            if(date == today) {
                eventsToday.push(event)
            }
        });

        this.setState({allEvents: allEvents, eventsToday: eventsToday})

    }

    changeFilter(el){
        let target = el.target.id;

        this.setState({
            showEvents: target
        })
    }

    render() {
        return (
            <div className="event-results-container">
                {/* loop through events passed as props and render every event */}
                <div className="event-results">
                    {/* Title of the type of events showing (all events, events today, etc) */}
                    {
                        this.state.showEvents === "show-all-events" ?
                            <span className="events-showing-title">All Events</span>
                            : this.state.showEvents === "show-events-today" ?
                                <span className="events-showing-title">{moment().format("dddd, MMMM DD YYYY")}</span>
                                : null
                    }
                    {
                        this.state.showEvents === "show-all-events" 
                            ? this.state.allEvents.length != 0 
                                ? this.state.allEvents.map((event, index) => {
                                    return (
                                        <Event key={index} eventInfo={event} />
                                    )
                                })
                                :   <div className="no-events">No events, why don't you create one?</div>

                        : this.state.showEvents === "show-events-today"
                            ? this.state.eventsToday.length != 0 
                                ? this.state.eventsToday.map((event, index) => {
                                    return (
                                        <Event key={index} eventInfo={event} />
                                    )
                                })
                                :   <div className="no-events"> No events today, why don't you create one?</div>

                            : <div className="no-events"> You didn't join any event, join one and it will show here.</div>
                    }
                </div>

                {/* Depending on the filter chosen we will display different(all events, events today, etc) */}
                <div className="events-filter-container">
                    <ul className="events-filter-list">
                        <li onClick={this.changeFilter} 
                            id="show-all-events" 
                            className={this.state.showEvents === "show-all-events" 
                                ? "events-filter-list-item active-filter" 
                                : "events-filter-list-item"}>All Events
                        </li>

                        <li onClick={this.changeFilter} 
                            id="show-events-today" 
                            className={this.state.showEvents === "show-events-today" 
                                ? "events-filter-list-item active-filter" 
                                : "events-filter-list-item"}>Today
                        </li>

                        <li onClick={this.changeFilter} 
                            id="show-my-events" 
                            className={this.state.showEvents === "show-my-events" 
                                ? "events-filter-list-item active-filter" 
                                : "events-filter-list-item"}>My events
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default EventResults;
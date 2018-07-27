import React, {Component} from 'react';
import Event from '../event/event';
import './eventResults.css'
// Datepicker
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EventResults extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allEvents: [],
            eventsToday: [],
            chosenDateEvents: [],
            myEvents: [],
            showEvents: "show-all-events",
            startDate: moment()
        }

        this.changeFilter = this.changeFilter.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.updateEvents = this.updateEvents.bind(this)
    }

    componentWillMount(){
        let today = moment().format("dddd, MMMM DD YYYY")
        let eventsToday = [];
        let allEvents = [];
        let myEvents = []
        
        this.props.events.map((event)=>{
            let date = event.date;
            // Transform dates to unix to be able to compare dates
            let dateUnix = moment(date).unix()
            let todayUnix = moment(today).unix()

            // We will check if the event date is in the future or if 
            // it has already passed, if it's in the future we will display it
            if(dateUnix >= todayUnix){
                allEvents.push(event);
            }

            if(date === today) {
                eventsToday.push(event)
            }
            // If the user is going to events we will add the to myEvents
            this.props.currentUserInfo.eventsGoing!== undefined && this.props.currentUserInfo.eventsGoing.length !== 0 
                ? this.props.currentUserInfo.eventsGoing.map((eventGoingId)=>{
                    // console.log(eventGoingId)
                    // console.log("event id: ",event.id)
                    if(eventGoingId === event.id && dateUnix >= todayUnix) {
                        myEvents.push(event)
                    }
                })
                : null
        });

        this.setState({allEvents: allEvents, eventsToday: eventsToday, myEvents: myEvents})
    }

    // This function will update the eventsGoing state everytime we join or leave an event
    updateEvents() {
        let myEvents = []
        this.props.events.map((event)=>{

            this.props.currentUserInfo.eventsGoing.map((eventGoingId)=>{
                // console.log(eventGoingId)
                // console.log("event id: ",event.id)
                if(eventGoingId === event.id) {
                    myEvents.push(event)
                }
            })
        });

        this.setState({myEvents: myEvents})

    }

    changeFilter(el){
        let target = el.target.id;

        this.setState({
            showEvents: target
        })
    }

    handleDateChange(date) {
        let chosenDate = date.format("dddd, MMMM DD YYYY");
        let chosenDateEvents = []

        this.state.allEvents.map((event)=> {
            let date = event.date;

            if(date === chosenDate) {
                chosenDateEvents.push(event)
            }
        })

        this.setState({
            startDate: date,
            showEvents: "chosen-date",
            chosenDateEvents: chosenDateEvents
        }, ()=>{console.log("date has changed")});
    }

    render() {
        return (
            <div className="event-results-container">
                {/* loop through events passed as props and render every event */}
                <div className="event-results">
                    {/* Title of the type of events showing (all events, events today, etc) */}
                    {
                        this.state.showEvents === "show-all-events" 
                            ? <span className="events-showing-title">All Events</span>
                            : this.state.showEvents === "show-events-today" 
                                ? <span className="events-showing-title">Today</span>
                                : this.state.showEvents === "chosen-date" 
                                    ? <span className="events-showing-title">{this.state.startDate.format("dddd, MMMM DD YYYY")}</span>
                                    : null

                    }
                    {/* Rendering Events depending on the filter */}
                    {   
                        // ALL Events
                        this.state.showEvents === "show-all-events" 
                            ? this.state.allEvents.length !== 0 
                                ? this.state.allEvents.map((event, index) => {
                                    return (
                                        <Event updateEvents={this.updateEvents} currentUserInfo={this.props.currentUserInfo} key={event.id} eventInfo={event} />
                                    )
                                })
                                // If there are no events in this category we will let the user now
                                :   <div className="no-events">No events, why don't you create one?</div>

                            // Events happening TODAY
                            : this.state.showEvents === "show-events-today"
                                ? this.state.eventsToday.length !== 0 
                                    ? this.state.eventsToday.map((event, index) => {
                                        return (
                                            <Event updateEvents={this.updateEvents} currentUserInfo={this.props.currentUserInfo} key={event.id} eventInfo={event} />
                                        )
                                    })
                                    // If there are no events in this category we will let the user now
                                    :   <div className="no-events"> No events today, why don't you create one?</div>

                                // Events happening on SPECIFIC DATE
                                : this.state.showEvents === "chosen-date"
                                    ? this.state.chosenDateEvents.length !== 0
                                        ? this.state.chosenDateEvents.map((event, index) => {
                                            return (
                                                <Event updateEvents={this.updateEvents} currentUserInfo={this.props.currentUserInfo} key={event.id} eventInfo={event} />
                                            )
                                        })
                                        // If there are no events in this category we will let the user now
                                        :<div className="no-events"> There are no events this date, why don't you create one?</div>
                                    
                                    : this.state.showEvents === "show-my-events"
                                        ? this.state.myEvents.length !== 0 
                                            ? this.state.myEvents.map((event, index) => {
                                                return (
                                                    <Event updateEvents={this.updateEvents} currentUserInfo={this.props.currentUserInfo} key={event.id} eventInfo={event} />
                                                )
                                            })
                                        :<div className="no-events"> You didn't join any event, join one and it will show here.</div>
                                    : null
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

                    {/* DatePicker */}
                    <DatePicker
                        // className="create-event-modal-info-input"
                        inline
                        readOnly={true}
                        minDate={moment()}
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                    />
                </div>
            </div>
        )
    }
}

export default EventResults;
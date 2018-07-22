import React, {Component} from 'react';
import './createEvent.css';
// Firebase
import firebase from 'firebase/app';
import '../firebase/';
// Datepicker
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class CreateEvent extends Component {
    constructor(props){
        super(props)

        this.state = {
            uid: firebase.auth().currentUser.uid,
            id: "",
            imageURL: false,
            title: "",
            location: "",
            date: moment().format("dddd, MMMM DD YYYY"),
            time: "",
            description: "",
            uploadedImg: false,
            startDate: moment(),
            startTime: moment("12:00","HH:mm"),
            inputErrors: {
                title: false,
                title_err: "",
                location: false,
                location_err: "",
                date: false,
                time: false,
                time_err: "",
                description: false,
                description_err: ""
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
        this.checkFields = this.checkFields.bind(this)
    }

    checkFields(state){    
        // This method will check if the input fields contain information
        // And will add a message error depending on the issue
        let prevErr = this.state.inputErrors;
        let errors = 0;
        // Title 
        if(state.title === "") {
            prevErr.title = "true";
            prevErr.title_err = "Enter a title"
            errors++
        } else if(state.title.length < 8) {
            prevErr.title = "true";
            prevErr.title_err = "Title should be longer"
            errors++
        }else {
            prevErr.title = "false";
            prevErr.title_err = null
        }
        // Location
        if(state.location === "") {
            prevErr.location = "true";
            prevErr.location_err = "Enter a location"    
            errors++    
        } else if(state.location.length < 8){
            prevErr.location = "true";
            prevErr.location_err = "Location should be longer"  
            errors++          
        } else {
            prevErr.location = "false";
            prevErr.location_err = null
        }
        // Time
        if(state.time === "" ) {
            prevErr.time = "true";
            prevErr.time_err = "Select time"
            errors++
        } else {
            prevErr.time = "false";
            prevErr.time_err = null
        }
        // Description
        if(state.description === "" ) {
            prevErr.description = "true";
            prevErr.description_err = "Enter a description";
            errors++
        } else {
            prevErr.description = "false";
            prevErr.description_err = null;

        }

        this.setState({inputErrors: prevErr})

        return errors;
    }

    createEvent() {      
        // We are gonna check if the input fields are correct
        // If everything is good we will crete the event
        if(this.checkFields(this.state) === 0) {
            // Change ID value to the time when the event is created
            // And then call createEvent method from parent
            let currentTime = Date.now()
            this.setState(
                {id: currentTime},
                ()=>{
                    this.props.createEvent(this.state)
                }
            )
        } else {
            return
        }
        
    }

    handleInputChange(el) {
        let inputName = el.target.name;
        let value = el.target.value;

        this.setState({
            [inputName]: value
        })
    }

    handleInputFileChange(el) {
        let file = el.target.files[0]
        this.setState({
            uploadedImg: file,
            imageURL: URL.createObjectURL(file)
        })
    }

    handleDateChange(date) {
        let formatDate = date.format("dddd, MMMM DD YYYY");

        this.setState({
            startDate: date,
            date: formatDate
        });
    }

    handleTimeChange(time) {
        let formatTime = time.format("h:mm A") 

        this.setState({
            startTime: time,
            time: formatTime
        });
    }

    render() {
        return (
            <div className="create-event-modal-container">
                <div onClick={()=>{this.props.toggleWindow()}} className="create-event-modal-background"></div>
                <div className="create-event-modal-content">
                    {/* CLOSE BUTTON */}
                    <div className="close-button-container">
                        <button onClick={()=>{this.props.toggleWindow()}}>
                            <img src="https://cdn1.iconfinder.com/data/icons/random-crafticons/48/misc-_close_-2-512.png" alt=""/>
                        </button>
                    </div>

                    <div className="create-event-modal-info-container">
                        {/* IMAGE */}
                        <div className="create-event-modal-image-container">
                            <div className="create-event-modal-image">
                                {this.state.imageURL !== false ?
                                    <img className="event-img-item" src={this.state.imageURL}  alt="event pic"/>
                                    : ""
                                }
                            </div>
                            <label htmlFor="input-file" className="input-file-label">
                                <input onChange={this.handleInputFileChange} id="input-file" type="file"/>
                                {this.state.uploadedImg === false
                                    ? "Add Image"
                                    : "Change Image"
                                }
                            </label>
                        </div>
                        {/* INFO INPUTS */}
                        <div className="create-event-modal-info">
                            {/* TITLE */}
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-error">
                                    {this.state.inputErrors.title === "true" 
                                        ? "*" + this.state.inputErrors.title_err
                                        : ""
                                    }
                                </div>
                                <div className="create-event-modal-info-label" htmlFor="title">Title</div>
                                <input 
                                    className={this.state.inputErrors.title === "true"
                                        ? "create-event-modal-info-input-error"
                                        : "create-event-modal-info-input"
                                    } 
                                    name="title" 
                                    value={this.state.title} 
                                    onChange={this.handleInputChange} type="text"/>
                            </div>
                            {/* LOCATION */}
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-error">
                                    {this.state.inputErrors.location === "true" 
                                        ? "*" + this.state.inputErrors.location_err
                                        : ""
                                    }
                                </div>
                                <div className="create-event-modal-info-label" htmlFor="location">Location</div>
                                <input 
                                    className={this.state.inputErrors.location === "true"
                                        ? "create-event-modal-info-input-error"
                                        : "create-event-modal-info-input"
                                    } 
                                    name="location" 
                                    value={this.state.location} 
                                    onChange={this.handleInputChange} type="text"/>
                            </div>
                            {/* DATE */}
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-label" htmlFor="date">Date</div>
                                <DatePicker
                                    className="create-event-modal-info-input"
                                    readOnly={true}
                                    minDate={moment()}
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>                                
                            {/* TIME */}
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-error">
                                    {this.state.inputErrors.time === "true" 
                                        ? "*" + this.state.inputErrors.time_err
                                        : ""
                                    }
                                </div>
                                <div className="create-event-modal-info-label" htmlFor="time">Time</div>
                                {/* <input className="create-event-modal-info-input" name="time" value={this.state.time} onChange={this.handleInputChange} type="text"/> */}
                                <DatePicker
                                    className={this.state.inputErrors.time === "true"
                                        ? "create-event-modal-info-input-error"
                                        : "create-event-modal-info-input"
                                    }
                                    readOnly={true}
                                    selected={this.state.startTime}
                                    onChange={this.handleTimeChange}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={30}
                                    dateFormat="LT"
                                    timeCaption="Time"
                                />
                            </div>

                        </div>
                        {/* DESCRIPTION */}
                        <div className="create-event-modal-info-field field-description">
                                <div className="create-event-modal-info-error">
                                    {this.state.inputErrors.description === "true" 
                                        ? "*" + this.state.inputErrors.description_err
                                        : ""
                                    }
                                </div>
                                <div className="create-event-modal-info-label" htmlFor="description">Description</div><br/>
                                <textarea 
                                    className={this.state.inputErrors.description === "true"
                                        ? "create-event-modal-info-textarea-error"
                                        : "create-event-modal-info-textarea"
                                    } 
                                    name="description" 
                                    value={this.state.description} 
                                    onChange={this.handleInputChange} type="text"> 
                                </textarea>
                        </div>

                    </div>
                        
                    <div className="create-cancel-buttons-container">
                        <button className="create-event-button" onClick={this.createEvent}>Create Event</button>
                        <button className="cancel-event-button" onClick={()=>{this.props.toggleWindow()}}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
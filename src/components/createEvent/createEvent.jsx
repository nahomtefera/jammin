import React, {Component} from 'react';
import './createEvent.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';

class CreateEvent extends Component {
    constructor(props){
        super(props)

        this.state = {
            uid: firebase.auth().currentUser.uid,
            imageURL: false,
            title: "",
            location: "",
            date: "",
            time: "",
            description: "",
            uploadedImg: false,           
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
    }

    handleInputChange(el) {
        let inputName = el.target.name;
        let value = el.target.value;

        this.setState({
            [inputName]: value
        })
    }

    handleInputFileChange(el) {
        let target = el.target;
        let file = el.target.files[0]
        this.setState({
            uploadedImg: file,
            imageURL: URL.createObjectURL(file)
        })
        
    }

    render() {
        return (
            <div className="create-event-modal-container">
                <div onClick={()=>{this.props.toggleWindow()}} className="create-event-modal-background"></div>
                <div className="create-event-modal-content">

                    <div className="close-button-container">
                        <button onClick={()=>{this.props.toggleWindow()}}>
                            <img src="https://cdn1.iconfinder.com/data/icons/random-crafticons/48/misc-_close_-2-512.png" alt=""/>
                        </button>
                    </div>

                    <div className="create-event-modal-info-container">

                        <div className="create-event-modal-image-container">
                            <div className="create-event-modal-image">
                                {this.state.imageURL != false ?
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

                        <div className="create-event-modal-info">
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-label" htmlFor="title">Title</div>
                                <input className="create-event-modal-info-input" name="title" value={this.state.title} onChange={this.handleInputChange} type="text"/>
                            </div>
                            
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-label" htmlFor="location">Location</div>
                                <input className="create-event-modal-info-input" name="location" value={this.state.location} onChange={this.handleInputChange} type="text"/>
                            </div>
                            
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-label" htmlFor="date">Date</div>
                                <input className="create-event-modal-info-input" name="date" value={this.state.date} onChange={this.handleInputChange} type="text"/>
                            </div>                                
                            
                            <div className="create-event-modal-info-field">
                                <div className="create-event-modal-info-label" htmlFor="time">Time</div>
                                <input className="create-event-modal-info-input" name="time" value={this.state.time} onChange={this.handleInputChange} type="text"/>
                            </div>

                        </div>

                        <div className="create-event-modal-info-field field-description">
                                <div className="create-event-modal-info-label" htmlFor="description">Description</div><br/>
                                <textarea className="create-event-modal-info-textarea" name="description" value={this.state.description} onChange={this.handleInputChange} type="text"> </textarea>
                        </div>

                    </div>
                        
                    <div className="create-cancel-buttons-container">
                        <button className="create-event-button" onClick={()=>{this.props.createEvent(this.state)}}>Create Event</button>
                        <button className="cancel-event-button" onClick={()=>{this.props.toggleWindow()}}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
import React, {Component} from 'react';
import './createEvent.css';

class CreateEvent extends Component {
    constructor(props){
        super(props)

        this.state = {
            title: "",
            location: "",
            date: "",
            time: ""            
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(el) {
        let inputName = el.target.name;
        let value = el.target.value;

        this.setState({
            [inputName]: value
        })
    }

    render() {
        return (
            <div className="create-event-modal-container">
                <div onClick={()=>{this.props.toggleWindow()}} className="create-event-modal-background"></div>
                <div className="create-event-modal-content">
                    <button onClick={()=>{this.props.toggleWindow()}}>X</button>
                    <fieldset>
                        <legend>Event Info</legend>
                        Title: <input name="title" value={this.state.title} onChange={this.handleInputChange} type="text"/> <br/>
                        Location: <input name="location" value={this.state.location} onChange={this.handleInputChange} type="text"/> <br/>
                        Date: <input name="date" value={this.state.date} onChange={this.handleInputChange} type="text"/> <br/>
                        Time: <input name="time" value={this.state.time} onChange={this.handleInputChange} type="text"/> <br/>
                    </fieldset>

                    <button onClick={()=>{this.props.createEvent(this.state)}}>Create Event</button>
                </div>
            </div>
        )
    }
}

export default CreateEvent;
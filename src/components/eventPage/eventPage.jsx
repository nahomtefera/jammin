import React, {Component} from 'react';
import './eventPage.css';
import moment from 'moment';
import firebase from 'firebase/app';
import '../firebase/';

class EventPage extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            loading: "true",
            event: {},
            event_owner: {},
            comments: null,
            comment_error: false,
            newComment: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitMessage = this.submitMessage.bind(this)
    }

    submitMessage(){
        let timestamp = Date.now();
        let commentInfo = {message: this.state.newComment, user: this.props.currentUser.name, timestamp: timestamp}
        
        if(this.state.newComment == "" || this.state.newComment.length < 5) {
            this.setState({comment_error: true})
            return
        }

        firebase.database().ref().child('/eventsComments/' + this.state.event.id + '/' + timestamp)
                .update({
                    message: this.state.newComment, 
                    user: this.props.currentUser.name,
                    user_img: this.props.currentUser.photoURL, 
                    timestamp: timestamp
                }).then(()=>{this.setState({newComment:"", comment_error:false})})
    }
    // 
    handleChange(el) {
        let value = el.target.value;

        this.setState({newComment: value, comment_error:false})
    }

    //

    componentWillMount(){
        //loader will appear everytime we open a new event page
        let self = this;
        setTimeout(function(){ 
            self.setState({loading:false})
        }, 1500);

        let event_id = this.props.props.match.params.id; {/* Event ID*/}
        let event_info = {}
        let user_info = {}
        let event_comments = []
        let commentsArr = []
        // We will call firebase to get all the info for the current event
        // Then we will pass the values of the event to the state
        firebase.database().ref(`events/${event_id}`).once('value').then(snap=>{
            event_info = snap.val()
        })
        // Once we have the event info we will use the uid of the even
        // And we will access firebase again to get the event_owner info
        .then(()=>{
            firebase.database().ref(`users/${event_info.uid}`).once('value').then(snap=>{
                user_info = snap.val()
                console.log(event_info)
            })
            // Once we have all the info regarding the event 
            // We will update the state with the info
            .then(()=>{
                firebase.database().ref(`eventsComments/${event_id}/`).on("child_added", snap=>{
                    // Everytime a message is created it will update commentsArr
                    commentsArr.push(snap.val());
                    self.setState({
                        comments: commentsArr,
                        newComment: ""
                    })
                });

                self.setState({
                    event: event_info,
                    event_owner: user_info,
                    comments: commentsArr
                })
            })
        })
    }

    
    render(){
        // event: date, description, id, imageURL, location, time, title, uid
        // user: name, username, photoURL
        return(
            <div className="event-page">
            
                <div className={this.state.loading === 'true' ? "loader-event-page-container" : "hide"}>

                    <div className="loader-event-wrapper">
                        <h1 className="loader-event-text">
                            <span className="loader-event-title">{this.state.event.title} </span>
                            at
                            <span className="loader-event-location"> {this.state.event.location}</span>
                        </h1>
                        <div className="loader-event-page">Loading...</div>
                    </div>

                </div>

                <div className="event-page-background"></div>

                <div className={this.state.loading === 'true' ? "hide" : "event-page-container"}>
                    <div className="event-page-header">
                        <span className="event-page-header-title">{this.state.event.title} </span>
                        at
                        <span className="event-page-header-location"> {this.state.event.location}</span>
                    </div>

                    <div className="event-user-info">
                        <img className="event-owner-img" src={this.state.event_owner.photoURL != null ? this.state.event_owner.photoURL : "https://goo.gl/cJ1cte"} alt="profile pic"/>
                        <div className="event-owner-user-name">{this.state.event_owner.name}</div>
                    </div>
                    
                    <div className="event-info">

                        <div className="event-description">
                            <span className="event-description-title">Description</span>
                            <p className="event-description-text">{this.state.event.description}</p>
                        </div>

                        <div className="event-date-time-location">
                            <span className="event-date-title">Date and Time</span>
                            <div className="event-date">{this.state.event.date}</div>
                            <div className="event-time">{this.state.event.time}</div>
                            <br/><br/>
                            <span className="event-date-title">Location</span>
                            <div className="event-date">{this.state.event.location}</div>
                            <div className="event-date">{this.state.event.address ? this.state.event.address : ""}</div>
                        </div>
                    </div>

                    {/* COMMENTS SECTION */}
                    <div className="comments-container">
                        <h1 className="comments-title">Comments</h1>

                        <div className="comments-messages">
                            <ul className="comments-list-container">
                                {
                                    this.state.comments !== null
                                        ? this.state.comments.length > 0
                                            ? this.state.comments.map((comment)=>{
                                                return <li key={comment.timestamp} className="comments-list-item">
                                                    <div className="comments-list-outer-container">
                                                        <span className="comment-user">{comment.user}</span>
                                                        <span className="comment-message">{comment.message}</span>
                                                        <span className="comment-time">{
                                                            moment(comment.timestamp).format("MMM DD - HH:mm")
                                                        }</span>
                                                    </div>
                                                </li>
                                            })
                                            : <li className="comments-list-item-empty">No comments yet.</li>
                                        : <li className="comments-list-item-empty">No comments yet.</li>
                                }
                            </ul>
                        </div>

                        <div className="comment-input-container">
                            <div className="comment-error-message">
                                {
                                    this.state.comment_error === true 
                                        ? "* Comment is empty or to short"
                                        : null
                                }
                            </div>

                            {
                                this.props.currentUser.photoURL !== null 
                                    ? <img className="current-user-img" src={this.props.currentUser.photoURL} alt="profile pic"/>
                                    : <img className="current-user-img" src="https://goo.gl/cJ1cte" alt="no profile pic"/>
                            }
                        
                            <textarea className="comment-input" 
                                placeholder="Comment..." 
                                value={this.state.newComment} 
                                onChange={this.handleChange}
                                name="comment" cols="30" rows="2"></textarea>
                            
                            <button className="comment-send-button" onClick={this.submitMessage}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventPage;
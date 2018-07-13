import React, {Component} from 'react';
import './account.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount(){
        var uid = this.props.user.uid;
        
        db.onceGetUsers().then((snap)=>{
            var user_info = snap.val()[uid];

            this.setState(user_info)
        })
    }

    render() {
        return (
            <div>
                <div className="profile-picture-container">
                    <img className="profile-picture-img" src={this.state.photoURL} alt="profile pic"/>
                </div>
                <span>{this.state.username}</span>
            </div>
        )
    }
}

export default Account;
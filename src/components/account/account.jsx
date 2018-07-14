import React, {Component} from 'react';
import './account.css';
import firebase from 'firebase/app';
import '../firebase/';
import { db } from '../firebase/';

class Account extends Component {

    constructor(props) {
        super(props);

        this.state = {
            //username, email, name, bio, gender, photoURL
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(el) {
        let val = el.target.value;
        let property = el.target.name;

        this.setState({
            [property]: val
        })
    }

    componentWillMount() {
        var uid = this.props.user.uid;
        db.onceGetUsers().then((snap)=>{
            var user_info = snap.val()[uid];

            this.setState(user_info)
        })
    }

    render() {
        return (
            <div className="account-container">
                {/* Account Navigation Container */}
                <div className="account-nav-container">
                    <ul className="account-nav-list">
                        <li className="account-nav-list-item">Edit Profile</li>
                        <li className="account-nav-list-item">Change Password</li>
                    </ul>
                </div>
                {/* Account Info Container */}
                <div className="account-info-container">
                    <div className="profile-picture-container">
                        <img className="profile-picture-img" src={this.state.photoURL} alt="profile pic"/>
                    </div>
                    <div className="display-name">{this.props.user.displayName}</div>
                    
                    {/* Info Change Form */}
                    <div className="account-info-form">
                        {/* Name */}
                        <div className="account-info-form-field">
                            <div className="account-info-form-field-label">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="account-info-form-field-input">
                                <input name="name" placeholder="name" onChange={this.handleInputChange} value={this.state.name} type="text"/>
                            </div>
                        </div>
                        {/* Username */}
                        <div className="account-info-form-field">
                            <div className="account-info-form-field-label">
                                <label htmlFor="username">Username</label>
                            </div>
                            <div className="account-info-form-field-input">
                                <input name="username" placeholder="username" onChange={this.handleInputChange} value={this.state.username} type="text"/>
                            </div>
                        </div>
                        {/* Email */}
                        <div className="account-info-form-field">
                            <div className="account-info-form-field-label">
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="account-info-form-field-input">
                                <input name="email" placeholder="email" onChange={this.handleInputChange} value={this.state.email} type="text"/>
                            </div>
                        </div>
                        {/* Bio */}
                        <div className="account-info-form-field bio-input">
                            <div className="account-info-form-field-label">
                                <label htmlFor="bio">Bio</label>
                            </div>
                            <div className="account-info-form-field-input">
                                <textarea name="bio" placeholder="Bio" onChange={this.handleInputChange} value={this.state.bio} cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account;
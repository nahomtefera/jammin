import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import './navbar.css';

const SignOutButton = () => {
    return(
    <button
        type="button"
        onClick={()=>{firebase.auth().signOut()}}
    >
        Sign-Out
    </button>
    )
}

class Navbar extends Component {

    render() {
        return (
            <div className={this.props.isLandingPage === true ? "navbar-container-landing-page" : "navbar-container"}>
                {
                    this.props.authUser ? 
                        <ul className="navbar-list-container">
                            <li className="navbar-list-item" ><Link to="/">Landing Page</Link></li>
                            <li className="navbar-list-item" ><Link to="/home">Home</Link></li>
                            <li className="navbar-list-item" ><Link to="/account">Account</Link></li>
                            <li className="navbar-list-item sign-out-button" ><SignOutButton /></li>
                        </ul>
                    :
                        <ul className="navbar-list-container">
                            <li className="navbar-list-item" ><Link to="/">Landing Page</Link></li>
                            <li className="navbar-list-item sign-in-button" ><Link to="sign-in">Login</Link></li>
                        </ul>
                }
                
            </div>
        )
    }
}

export default Navbar;
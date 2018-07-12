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
            <div>
                {
                    this.props.authUser ? 
                        <ul>
                            <li><Link to="/">Landing Page</Link></li>
                            <li><Link to="home">Home</Link></li>
                            <li><SignOutButton /></li>
                        </ul>
                    :
                        <ul>
                            <li><Link to="/">Landing Page</Link></li>
                            <li><Link to="sign-in">Sign-In</Link></li>
                        </ul>
                }
                
            </div>
        )
    }
}

export default Navbar;
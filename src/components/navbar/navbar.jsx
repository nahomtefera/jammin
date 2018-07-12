import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Landing Page</Link></li>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="sign-in">Account</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="account">Account</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;
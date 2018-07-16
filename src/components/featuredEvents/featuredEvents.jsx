import React, {Component} from 'react';
import './featuredEvents.css';

class FeaturedEvents extends Component {

    render() {
        return (
            <div className="featured-events-container">
                <h1 className="featured-events-title">Featured Events</h1>
                <div className="stripe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline points="-2,0 100,0 100,20.3" fill="#eaeaea"></polyline>
                        <polygon fill="white" points="0,0 100,0 100,20"/>
                    </svg>
                </div>
                <div className="featured-events">
                    <div className="featured-events-item">
                        <h3>Event Title</h3>
                        <h4>Event Location</h4>
                        <p>Event Description</p>

                    </div>
                </div>
            </div>
        )
    }
}

export default FeaturedEvents;




import React, {Component} from 'react';
import './featuredEvents.css';

class FeaturedEvents extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            events: [
                {img:"https://goo.gl/ZUCcqq"},
                {img:"https://goo.gl/p6bbT3"},
                {img:"https://goo.gl/tyDAz8"},
                {img:"https://goo.gl/8vqAcJ"},
                {img:"https://goo.gl/Cbe2CT"},
                {img:"https://goo.gl/aqp4dD"},

            ]
        }
    }

    render() {
        return (
            <div className="featured-events-container">
                <h1 className="featured-events-title">Featured Events</h1>
                <div className="stripe">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline points="-2,0 100,0 100,20.3" fill="#eaeaea"></polyline>
                        <polygon fill="#fafafa" points="0,0 100,0 100,20"/>
                    </svg>
                </div>

                <div className="featured-events">
                    {this.state.events.map((event, index)=>{
                        return(
                                <div key={index} className="featured-events-item">
                                    <div className="featured-events-item-img-container">
                                        <img src={event.img} alt="band"/>
                                    </div>

                                    <div className="featured-events-info">
                                        <h3>Event Title</h3>
                                        <h4>Event Location</h4>
                                        <p>Event Description</p>
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default FeaturedEvents;




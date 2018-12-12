import React, {Component} from 'react';
import './landingPage.css';
import '../featuredEvents/featuredEvents';
import FeaturedEvents from '../featuredEvents/featuredEvents';

class LandingPage extends Component {

    render() {
        return (
            <div className="landing-page-container">
                {/* Introduction - Statement */}
                <div className="landing-page-intro">
                    <h1 className="landing-page-intro-title">
                        <span>Jammin Network</span> <br/>
                        <span className="landing-page-intro-sub-title">Find local musicians, join a group,</span><span className="landing-page-intro-sub-title-emphasis"> Jam</span>
                    </h1>
                </div>
                {/* Introduction - App Summary */}
                <div className="landing-page-info-box-container" style={{display: "none"}}>
                    <div className="loading-page-info-box-item">
                        <h3 className="box-item-title">
                            Find Musicians
                        </h3>
                        <p className="box-item-description">
                            Get in touch with the musicians around you.
                        </p>
                    </div>
                    <div className="loading-page-info-box-item">
                        <h3 className="box-item-title">
                            Join a Group
                        </h3>
                        <p className="box-item-description">
                            Find the groups that suits you better.
                        </p>
                    </div>
                    <div className="loading-page-info-box-item">
                        <h3 className="box-item-title">
                            Jam
                        </h3>
                        <p className="box-item-description">
                            Take your instruments and make some noise.
                        </p>
                    </div>
                </div>
                {/* Featured Events */}
                {/* <FeaturedEvents /> */}
            </div>
        )
    }
}

export default LandingPage;
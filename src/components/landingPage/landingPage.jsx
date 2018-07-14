import React, {Component} from 'react';
import './landingPage.css';

class LandingPage extends Component {

    render() {
        return (
            <div className="landing-page-container">
                <div className="landing-page-intro">
                    <h1 className="landing-page-intro-title">
                        <span>Jammin Network</span> <br/>
                        <span className="landing-page-intro-sub-title">Find local musicians, join a group,</span><span className="landing-page-intro-sub-title-emphasis"> Jam</span>
                    </h1>
                </div>
                <div className="landing-page-info-box">

                </div>
            </div>
        )
    }
}

export default LandingPage;
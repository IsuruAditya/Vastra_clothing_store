import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './CSS/vidBan2.css';
import videoSrc from './Videos/video2.mp4';
import { Link } from 'react-router-dom';

const VideoBanner2 = () => {
    return (
        <div className="video-banner">
            {/* Video background */}
            <video
                className="video-banner-video"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Overlay for contrast */}
            <div className="video-banner-overlay"></div>

            {/* Content container */}
            <div className="video-banner-content">
                {/* Left side: Typing text animation */}
                <div className="text-container">
                    <Typewriter
                        words={['Be unique!', 'Find what best suits you!']}
                        loop
                        cursor
                        cursorStyle='_'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                    
                </div>

                {/* Right side: Call-to-action button */}
                <div className="button-container">
                    <Link to='/latest-collection' className="cta-button">Explore</Link>
                </div>
            </div>
        </div>
    );
};

export default VideoBanner2;

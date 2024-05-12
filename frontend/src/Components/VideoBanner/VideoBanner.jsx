import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './CSS/vidBan1.css';
import video from './Videos/video.mp4';

const VideoBanner = () => {
    return (
        <div className="video-banner">
            {/* Video with a dark overlay */}
            <video
                className="video-banner-video"
                autoPlay
                loop
                muted
                playsInline 
            >
                 <source src={video} />
            </video>
            <div className="video-banner-overlay"></div>

            {/* Typing animation on top of the video */}
            <div className="video-banner-text">

                
                <Typewriter
                    words={['The Choice of Young Generation...', 'Choose your desired style...']}
                    loop
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                />
            </div>
        </div>
    );
};

export default VideoBanner;

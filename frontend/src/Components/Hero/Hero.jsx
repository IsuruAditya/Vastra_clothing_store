import React from "react";
import "./hero.css";
import announcement from "../Assets/announcement.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/man-posing.png";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={announcement} alt="hand icon" />
          </div>
          <p>Collection</p>
          <p>for everyone</p>
        </div>

        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow icon"></img>
        </div>
      </div>

      <div className="hero-right">
        <img className="hero-img" src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;

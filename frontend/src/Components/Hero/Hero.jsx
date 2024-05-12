import React from "react";
import "./hero.css";
import announcement from "../Assets/announcement.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/man-posing.png";
import { Link } from "react-router-dom";
import new_icon from "../Assets/new.png";
const Hero = () => {
  return (
    <div className="hero-outer">
      <div className="hero">
        <div className="hero-left">
         <h2> <span><img src={new_icon} alt="new icon" className="hero-new-icon" /></span>ARRIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>New</p>
              <img src={announcement} alt="hand icon" />
            </div>
            <p>Collection</p>
            <p>Unveiled ..</p>
            <h2>Elevate Your Style !</h2>
          </div>
          <div className="hero-latest-btn">
            <Link to="/latest-collection" style={{ textDecoration: "none", color: "white" }}>Latest Collection</Link>
            <img src={arrow_icon} alt="arrow icon"></img>
          </div>
        </div>
        <div className="hero-right">
          <img className="hero-img" src={hero_image} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

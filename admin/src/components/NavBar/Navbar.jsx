import React from "react";
import "./navbar.css";
import clothesHanger from "../../assets/clothes-hanger.png";
import navProfile from "../../assets/nav-profile.svg";
const Navbar = () => {
  return (
    <div className="navbar">

      <div className="logo-box">

      <img src={clothesHanger} alt="" className="nav-logo" />
      <div className="nav-title">VASTRA<span>Admin Panel</span></div>

      </div>

      <img className="nav-profile" src={navProfile} alt="" />
    </div>
  );
};

export default Navbar;

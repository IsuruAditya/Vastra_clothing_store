import React, { useContext, useRef, useState } from "react";
import "./navbar.css";
import logo from "../Assets/clothes-hanger.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/arrow-bottom.png"
import Swal from "sweetalert2";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
menuRef.current.classList.toggle("nav-menu-visible");
e.target.classList.toggle("open");
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have been successfully logged out!",
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      window.location.replace("/");
    }, 1500);
  };
    
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>VASTRA</p>
      </div>
      <img className="nav-dropdown" src={nav_dropdown} onClick={dropdown_toggle} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("men");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/men">
            Men
          </Link>
          {menu === "men" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/women">
            Women
          </Link>
          {menu === "women" && <hr />}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          {" "}
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {
          localStorage.getItem("auth-token") ? <button onClick={logout}>Logout</button> :<Link to="/login"><button>Login</button></Link>
        }
        <Link to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;

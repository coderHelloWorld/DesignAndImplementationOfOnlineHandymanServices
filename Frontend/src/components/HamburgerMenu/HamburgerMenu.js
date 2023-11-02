import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import './HamburgerMenu.css'


function HamburgerMenu() {
  // const [loginStatus, prevloginStatus] = useState(false);
  // const loginhandler = () => {
  //     console.log("In handler");
  //     let init = !loginStatus
  //     prevloginStatus(init)
  //     handleClick();
  // }

  const loginhandler =() => {
    localStorage.setItem('userData', "")
    localStorage.setItem('jwtTokenForHandyman', "")
    setTimeout(() => {
      console.log("in timeout");
    }, 5000)
    handleClick()
  }
  const buttonRef = useRef(null);
  const handleClick = () => {
    buttonRef.current.click(); // Programmatic click on the button
  };
  //let logstatus;
  //let navitems;
  // if(loginStatus){
  //     logstatus = "Logout"
  //     navitems = <>
  //                     <li onClick={handleClick}><NavLink to="/cart">Cart</NavLink></li>
  //                     <li onClick={handleClick}><NavLink to="/">Orders</NavLink></li>
  //                </>
  // }
  // else{
  //     logstatus = "Login/Signup"
  // }
  
  return (
    <>
      <input type="checkbox" id="active" />
      <label htmlFor="active" className="menu-btn">
        <span />
      </label>
      <label ref={buttonRef} htmlFor="active" className="close" />
      <div className="wrapper">
        <ul>
          <li><NavLink to="/" onClick={handleClick}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={handleClick}>About</NavLink></li>
          <li><NavLink to="/shop" onClick={handleClick}>shop</NavLink></li>
          <li onClick={handleClick}><NavLink to="/cart">Cart</NavLink></li>
          <li onClick={handleClick}><NavLink to="/order">Orders</NavLink></li>
          <li><NavLink to="/" onClick={loginhandler}>LogOut</NavLink></li>
        </ul>
      </div>
    </>    
  );
}

export default HamburgerMenu;

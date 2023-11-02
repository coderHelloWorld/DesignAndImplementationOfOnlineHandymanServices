import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from './navbar.module.css'

function Navbar(){
    const [loginStatus, prevloginStatus] = useState(false);
    const loginhandler = () => {
        console.log("In handler");
        let init = !loginStatus
        prevloginStatus(init)
    }
    let logstatus;
    let navitems;
    if(loginStatus){
        logstatus = "Logout"
        navitems = <>
                        <NavLink to="/" className={classes.li}>Cart</NavLink>
                        <NavLink to="/" className={classes.li}>Orders</NavLink>
                   </>
    }
    else{
        logstatus = "Login / Signup"
    }
    return(
        <header className={classes.mainnav}>
            <h1 className={classes.h1}>Handyman's Store</h1>
            <ul className={classes.ul}>
                <NavLink to="/" className={classes.li}>Home</NavLink>
                <NavLink to="/" className={classes.li}>About</NavLink>
                <NavLink to="/" className={classes.li}>Shop</NavLink>
                {navitems}
                <NavLink to="/login" className={`${classes.li} ${classes.liend}`} onClick={loginhandler}>{logstatus}</NavLink>
            </ul>
        </header>
    );
}
export default Navbar;


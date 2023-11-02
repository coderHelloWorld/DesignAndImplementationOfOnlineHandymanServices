import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import allActions from './../../../actions/index';
import classes from './signin.module.css'
import userIcon from '../svg/username.svg';
import passwordIcon from '../svg/password.svg';
import img from '../svg/white_down.png'

function Signin() {

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email: event.target.elements.username.value,
      password: event.target.elements.password.value,
    };

    dispatch(allActions.loginData(formData));
  };


    return (
      <div className={classes.main}>
        <div className={classes.x}></div>
        <div className={classes.head}>
            <h1> Welcome back!</h1>
        </div>
            <form onSubmit={handleSubmit}>
              <div className={classes.sty}>
                <div className={classes['form-group']}>
                  <img src={userIcon} alt="User Icon" className={classes['input-icon']} />
                  <input type="text" name="username" className={classes['form-control']} placeholder="Username" required />
                </div>
                <div className={classes['form-group']}>
                  <img src={passwordIcon} alt="Password Icon" className={classes['input-icon']} />
                  <input type="password" name="password" className={classes['form-control']} placeholder="Password" required />
                </div>
              </div>
              <div className={classes.end}>
                <div>
                    <h2> Sign In</h2>     
                </div>
                <button type="submit" className={classes['submit-button']}>
                    <img src={img} alt="Submit" />
                </button>
              </div>
            </form>
            <div className={classes.back}>
                <NavLink to="/" className={classes.n}> <span>Back to homepage</span></NavLink>
            </div>
      </div>
    );
  }
  
  export default Signin;


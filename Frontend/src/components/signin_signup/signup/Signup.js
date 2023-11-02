import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import allActions from './../../../actions/index';
import classes from './signup.module.css'
import userIcon from '../svg/username.svg';
import passwordIcon from '../svg/password.svg';
import img from '../svg/white_down.png'

function Signup() {

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(event.target.elements.password.value === event.target.elements.password.value){
      const formData = {
        email: event.target.elements.username.value,
        password: event.target.elements.password.value      
      };
    
      dispatch(allActions.registerData(formData));
    }  
  };

    return (
      <div className={classes.main}>
        <div className={classes.x}></div>
        <div className={classes.head}>
            <h1> Register!</h1>
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
                <div className={classes['form-group']}>
                  <img src={passwordIcon} alt="Password Icon" className={classes['input-icon']} />
                  <input type="password" name="conformpassword" className={classes['form-control']} placeholder="Conform Password" required />
                </div>
              </div>
              <div className={classes.end}>
                <div>
                    <h2> Sign Up</h2>     
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
  
  export default Signup;


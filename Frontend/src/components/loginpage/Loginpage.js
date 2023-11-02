import React, {useState, useEffect} from "react";
import classes from './loginpage.module.css'
import './login.css'
import Footer from "../footer/Footer";

function Loginpage(){
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []); // It sounds like you're experiencing an issue with scroll position persistence across different pages or components. When you navigate to a new page or component, the browser or React may retain the previous scroll position, causing the new page to start at a certain offset from the top.
      //To solve this issue, you can use one of the following approaches:
     // Reset the scroll position on page/component load: You can reset the scroll position to the top of the page or component using the window.scrollTo method. For example, you can add the following code to the componentDidMount or useEffect hook of your component to reset the scroll position to the top:

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name} and password was: ${pass}` )
    }

    return(
        <div className={classes.top}>
            <h1 className={classes.hel}>Hello folks</h1>
            <div className={classes.all}>
                <form onSubmit={handleSubmit} className={classes.ondiv}>
                    <label className={classes.lab1}>User ID: </label>
                    <input className={classes.inp1}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <label className={classes.lab2}>Password: </label>
                    <input className={classes.inp2}
                        type="text"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)} />
                    <button className={classes.btn} role="button">Done!</button>
                </form>
            </div>
            <Footer />
        </div>
        

    );
}

export default Loginpage;

/* <input type="submit" className={classes.btn}/> */
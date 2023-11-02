import React, {useEffect, useState} from "react";
//import Navbar from "../navigationBar/Navbar";
import classes from './title.module.css'
import TypingAnimation from "../../subcomponents/TypingAnimation/TypingAnimation";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Title(){

  /// GET LOCATION AND SEND CODE ////////////

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's current location using the HTML5 Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude)
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        const sendDataToBackend = async (lat, long) => {
            try {
              const jwtToken = localStorage.getItem('jwtTokenForHandyman');
              console.log("Coordinates to be sent", lat, long)
              // Send the location coordinates to the backend server using axios
              const response = await axios.patch(process.env.REACT_APP_API_URL + '/users/location', {
                coordinates : [lat, long ]
              },{
                headers: {
                  Authorization: `Bearer ${jwtToken}`
                }
              });
              console.log(response.data);
            } catch (error) {
              console.log(error);
            }
          };
        sendDataToBackend(position.coords.latitude, position.coords.longitude)  
      },
      (error) => {
        console.log(error);
        localStorage.setItem('jwtTokenForHandyman', '');
        setTimeout(() => {
            navigate('/');
        }, 3000);
      },
      { enableHighAccuracy: true }
    );
  }, []);



  ///////////////////////////////////

    const[showComponent, setShowComponent] = useState(false);
    useEffect(()=>{
        setInterval(()=>{
            setShowComponent(!showComponent);
        },3000);
    }, []);

    return(
        <div >
           <div className={classes.title}><p >Handyman's Shop</p></div>
           <div className={classes.hometitle}>
                <div className={classes.typing}>
                    <TypingAnimation text="Experience the Quality." interval={100} />
                </div>
                {showComponent && <div  className={classes.extra}><p>Find Exactly what you need. We Provide Services for 50+ categories.</p></div>}
            </div> 
        </div>
        
        
    );
}

export default Title;
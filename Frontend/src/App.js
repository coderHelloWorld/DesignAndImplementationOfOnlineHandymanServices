import React, { useState, useEffect } from 'react'; 
import {Route, Routes, Navigate } from 'react-router-dom' ;
import './App.css';
import classes from './app.module.css'
import Homepage from './components/homepage/Homepage'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
import Aboutus from './components/aboutus/Aboutus';
import Categories from './components/Categories/Categories.js';
import Signin from './components/signin_signup/signin/Signin.js';
import Signup from './components/signin_signup/signup/Signup.js';
import IndividualCategory from './components/individualCategory/IndividualCategory.js';
import Cart from './components/cart/Cart';
import Hp from './components/hp/Hp'
import Order from './components/order/Order'
import { useSelector } from 'react-redux';
import axios from 'axios';


// Update the App component
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');

  const loggedIn = useSelector(state => state.loginReducer.loggedIn);

  useEffect(() => {
    if (jwtToken) {
      axios.get(process.env.REACT_APP_API_URL + '/users/checkLoginStatus', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      .then(response => {
        console.log("response from res: ",response.data.status)
        localStorage.setItem('userData', JSON.stringify(response.data.data.newUser));
        setIsLoggedIn(true);
      })
      .catch(error => {
        setIsLoggedIn(false);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, [jwtToken]);

  return (
    <div>
      <div className={classes.header}>
      {isLoggedIn === false ? <div></div> : <HamburgerMenu />}
      </div>

      <Routes>
      <Route path="/" exact element={isLoggedIn === false ? <Hp /> : <Navigate to="/home" />} />
        <Route path="/home" exact element={isLoggedIn === true ? <Homepage /> : <Navigate to="/" />} />
        <Route path="/shop" exact element={isLoggedIn === true ? <Categories /> : <Navigate to="/" />} />
        <Route path="/cart" exact element={isLoggedIn === true ? <Cart /> : <Navigate to="/" />} /> 
        <Route path="/about" exact element={isLoggedIn === true ? <Aboutus /> : <Navigate to="/" />} /> 
        <Route path="/shop" exact element={isLoggedIn === true ? <Categories /> : <Navigate to="/" />} /> 
        <Route path="/shop/:id" element={isLoggedIn === true ? <IndividualCategory /> : <Navigate to="/" />} />
        <Route path="/order" exact element={isLoggedIn === true ? <Order /> : <Navigate to="/" />} /> 
        <Route path="/login" exact element={isLoggedIn === false ? <Signin /> : <Navigate to="/home" />} />
        <Route path="/register" exact element={isLoggedIn === false ? <Signup /> : <Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;

//<Route path="/" exact element={<Homepage />} />





// function App() {

//   return (
//     <div>
      
//       <div className={classes.header}>
//         <HamburgerMenu />
//       </div>
      
//       <Routes>
//         <Route path="/" element={<Homepage />}/>
//         <Route path="/login" exact element={<Signin />} /> 
//         <Route path="/register" exact element={<Signup />} /> 
//         <Route path="/cart" exact element={<Cart />} /> 
//         <Route path="/about" exact element={<Aboutus />} /> 
//         <Route path="/shop" exact element={<Categories />} /> 
//         <Route path="/shop/:id" element={<IndividualCategory />} />
//       </Routes>

//     </div>
//   );
// }

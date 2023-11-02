import {cartDataRequest, cartDataSuccess, cartDataFailure} from './addCart.js'
import axios from 'axios';
 
export const removeCart = () => {
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');
  return (dispatch) => {
    dispatch(cartDataRequest());

    axios.post(process.env.REACT_APP_API_URL + '/users/clearCart',{}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log("data from backednnnnnn FOR REMOVE CART is",data);
        //localStorage.setItem('jwtTokenForHandyman', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.updatedUser));
        //const storedData = JSON.parse(localStorage.getItem('myData'));
        dispatch(cartDataSuccess(data.data.updatedUser.cart));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(cartDataFailure(errorMessage));
      });
  };
};

export default removeCart;
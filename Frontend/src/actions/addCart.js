import axios from 'axios';

export const cartDataRequest = () => {
  return {
    type: 'FETCH_CART_DATA_REQUEST'
  }
}

export const cartDataSuccess = (data) => {
  return {
    type: 'FETCH_CART_DATA_SUCCESS',
    payload: data
  }
}

export const cartDataFailure = (error) => {
  return {
    type: 'FETCH_CART_DATA_FAILURE',
    payload: error
  }
}

// REACT_APP_API_URL=http://localhost:9000/api/v1/users/addCart npm start

export const addCart = (id, name, subname, price) => {
  //console.log(process.env.REACT_APP_API_URL);
  const newDetails = {
    "workerId": id,
    "workerName": name,
    "subcategoryName": subname,
    "price": price
  }
  console.log("newdetails", newDetails);
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');

  return (dispatch) => {
    dispatch(cartDataRequest());

    axios.post(process.env.REACT_APP_API_URL + '/users/addCart', newDetails, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log("data from backednnnnnn FOR Add CART is",data);
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

export const getCart = () => {
  return (dispatch) => {
        const data = JSON.parse(localStorage.getItem('userData'));
        console.log("get cart details", data.cart)
        dispatch(cartDataSuccess(data.cart));
  };
};
  

// const addCart = (id, name, subname, price) => {

//   const newDetails = {
//     "id": id,
//     "Name": name,
//     "SubcategoryName": subname,
//     "Price": price
//   }
//   console.log("newdetails", newDetails);

//   return {
//     type: 'ADD_DETAILS',
//     payload: newDetails
//   }
// }

// export default addCart
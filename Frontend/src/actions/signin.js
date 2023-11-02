import axios from 'axios';

export const loginDataRequest = () => {
  return {
    type: 'FETCH_LOGIN_DATA_REQUEST'
  }
}

export const loginDataSuccess = (data) => {
  return {
    type: 'FETCH_LOGIN_DATA_SUCCESS',
    payload: data
  }
}

export const loginDataFailure = (error) => {
  return {
    type: 'FETCH_LOGIN_DATA_FAILURE',
    payload: error
  }
}

export const loginData = (formData) => {
  return (dispatch) => {
    dispatch(loginDataRequest());

    axios.post(process.env.REACT_APP_API_URL + '/users/login', formData)
      .then(response => {
        const data = response.data;
        console.log("data from backednnnnnn FOR LOGIN is",data);
        localStorage.setItem('jwtTokenForHandyman', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.user));
        //const storedData = JSON.parse(localStorage.getItem('myData'));
        dispatch(loginDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(loginDataFailure(errorMessage));
      });
  };
};


// export const login = (formData) => (dispatch) => {
//   dispatch({ type: LOGIN_REQUEST });

//   axios.post('/api/login', formData)
//     .then((response) => {
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: response.data,
//       });
//     })
//     .catch((error) => {
//       dispatch({
//         type: LOGIN_FAILURE,
//         payload: error.message,
//       });
//     });
// };

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';




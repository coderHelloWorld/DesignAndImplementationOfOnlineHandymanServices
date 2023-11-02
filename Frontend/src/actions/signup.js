import axios from 'axios';

export const registerDataRequest = () => {
  return {
    type: 'FETCH_REGISTER_DATA_REQUEST'
  }
}

export const registerDataSuccess = (data) => {
  return {
    type: 'FETCH_REGISTER_DATA_SUCCESS',
    payload: data
  }
}

export const registerDataFailure = (error) => {
  return {
    type: 'FETCH_REGISTER_DATA_FAILURE',
    payload: error
  }
}

export const registerData = (formData) => {
  return (dispatch) => {
    dispatch(registerDataRequest());

    axios.post(process.env.REACT_APP_API_URL + '/users/signup', formData)
      .then(response => {
        const data = response.data;
        console.log("data from backednnnnnn for register is",data);
        localStorage.setItem('jwtTokenForHandyman', data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.user));
        dispatch(registerDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(registerDataFailure(errorMessage));
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
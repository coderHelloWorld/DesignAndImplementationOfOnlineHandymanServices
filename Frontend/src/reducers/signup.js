const initialState = {
    userDataNew: null,
    tokenSignup: null,
    loading: false,
    error: null,
    loggedIn: false
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REGISTER_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_REGISTER_DATA_SUCCESS':
      return {
        ...state,
        userDataNew: action.payload.data,
        tokenSignup: action.payload.token,
        loggedIn: true,
        loading: false,
        error: null
      };
    case 'FETCH_REGISTER_DATA_FAILURE':
      return {
        ...state,
        userDataNew: null,
        tokenSignup: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default registerReducer;
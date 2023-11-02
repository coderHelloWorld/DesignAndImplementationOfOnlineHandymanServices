const initialState = {
    userData: null,
    token: null,
    loading: false,
    error: null,
    loggedIn: false
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGIN_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_LOGIN_DATA_SUCCESS':
      return {
        ...state,
        userData: action.payload.data,
        token: action.payload.token,
        loggedIn: true,
        loading: false,
        error: null
      };
    case 'FETCH_LOGIN_DATA_FAILURE':
      return {
        ...state,
        userData: null,
        token: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default loginReducer;
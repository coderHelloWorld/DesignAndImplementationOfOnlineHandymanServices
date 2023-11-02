const initialState = {
    details: [],
    loading: false,
    error: null,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CART_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_CART_DATA_SUCCESS':
      console.log("Action payload is", action.payload)
      return {
        ...state,
        details: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CART_DATA_FAILURE':
      return {
        ...state,
        details: null,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default cart;

// const cart = (state = initialState, action) => {
//   switch (action.type) {
//     case 'ADD_DETAILS':
//         return { ...state, details: [...state.details, action.payload] };
//     case 'REMOVE_DETAILS':
//         return {...state, details: []};
//     default:
//       return state;
//   }
// };

// export default cart
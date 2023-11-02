const initialState = {
    categories: [],
    loading: false,
    error: null
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORY_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_CATEGORY_DATA_SUCCESS':
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_CATEGORY_DATA_FAILURE':
      return {
        ...state,
        categories: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default categoryReducer;
  
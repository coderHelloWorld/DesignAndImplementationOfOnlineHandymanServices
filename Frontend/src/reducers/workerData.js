const initialState = {
    workers: [],
    loading: false,
    error: null
}

const workerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_WORKER_DATA_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'FETCH_WORKER_DATA_SUCCESS':
      return {
        ...state,
        workers: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_WORKER_DATA_FAILURE':
      return {
        ...state,
        workers: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default workerReducer;
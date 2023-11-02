import axios from 'axios';

export const fetchWorkerDataRequest = () => {
  return {
    type: 'FETCH_WORKER_DATA_REQUEST'
  }
}

export const fetchWorkerDataSuccess = (data) => {
  return {
    type: 'FETCH_WORKER_DATA_SUCCESS',
    payload: data
  }
}

export const fetchWorkerDataFailure = (error) => {
  return {
    type: 'FETCH_WORKER_DATA_FAILURE',
    payload: error
  }
}

export const fetchWorkerData = () => {
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');

  return (dispatch) => {
    dispatch(fetchWorkerDataRequest());

    axios.get(process.env.REACT_APP_API_URL + '/data/handyman', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const data = response.data.data.allHandymans;
        //console.log("data from backednnnnnn is",data);
        dispatch(fetchWorkerDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchWorkerDataFailure(errorMessage));
      });
  };
};
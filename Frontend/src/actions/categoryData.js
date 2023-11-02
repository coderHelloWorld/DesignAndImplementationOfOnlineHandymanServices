import axios from 'axios';
export const fetchCategoryDataRequest = () => {
  return {
    type: 'FETCH_CATEGORY_DATA_REQUEST'
  }
}

export const fetchCategoryDataSuccess = (data) => {
  return {
    type: 'FETCH_CATEGORY_DATA_SUCCESS',
    payload: data
  }
}

export const fetchCategoryDataFailure = (error) => {
  return {
    type: 'FETCH_CATEGORY_DATA_FAILURE',
    payload: error
  }
}

export const fetchCategoryData = () => {
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');
  return (dispatch) => {
    dispatch(fetchCategoryDataRequest());

    axios.get(process.env.REACT_APP_API_URL + '/data/category', {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const data = response.data.data.allCategories;
        //console.log("data from backednnnnnn is",data);
        dispatch(fetchCategoryDataSuccess(data));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(fetchCategoryDataFailure(errorMessage));
      });
  };
};

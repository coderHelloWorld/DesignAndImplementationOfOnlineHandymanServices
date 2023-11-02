import axios from 'axios';

// export const orderDataRequest = () => {
//   return {
//     type: 'FETCH_ORDER_DATA_REQUEST'
//   }
// }

// export const orderDataSuccess = (data) => {
//   return {
//     type: 'FETCH_ORDER_DATA_SUCCESS',
//     payload: data
//   }
// }

// export const orderDataFailure = (error) => {
//   return {
//     type: 'FETCH_ORDER_DATA_FAILURE',
//     payload: error
//   }
// }

export const addOrder = (originalData) => {
    const { add, item_det } = originalData;

    // Map the array of item details to the desired format
    const items = item_det.map(item => ({
      subcategory: item.subcategory,
      instruction: item.instruction,
      id: item.wid,
      date: item.date,
      time: item.time,
      price: item.price,
      workerName: item.name
    }));
    
    // Create transformed data object
    const transformedData = {
      add,
      items
    };
  console.log("new order ", transformedData);
  const jwtToken = localStorage.getItem('jwtTokenForHandyman');

  return (dispatch) => {
    axios.post(process.env.REACT_APP_API_URL + '/order/order', transformedData, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
      .then(response => {
        const data = response.data;
        console.log("data from backednnnnnn FOR Add ORDER is",data);
      })
      .catch(error => {
        const errorMessage = error.message;
      });
  };
};
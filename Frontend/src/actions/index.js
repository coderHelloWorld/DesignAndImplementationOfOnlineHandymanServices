import {addCart, cartDataRequest, cartDataSuccess, cartDataFailure, getCart} from './addCart.js'
import removeCart from './removeCart.js'
import {fetchCategoryDataRequest, fetchCategoryDataSuccess, fetchCategoryDataFailure, fetchCategoryData} from './categoryData.js'
import {fetchWorkerDataRequest, fetchWorkerDataSuccess, fetchWorkerDataFailure, fetchWorkerData} from './workerData.js'
import {loginDataRequest, loginDataSuccess, loginDataFailure, loginData} from './signin.js'
import {registerDataRequest, registerDataSuccess, registerDataFailure, registerData} from './signup.js'
import { addOrder } from './addOrder.js'
const allActions = {
    addCart,
    getCart,
    cartDataRequest, 
    cartDataSuccess, 
    cartDataFailure,
    removeCart,
    fetchCategoryData,
    fetchCategoryDataFailure,
    fetchCategoryDataSuccess,
    fetchCategoryDataRequest,
    fetchWorkerDataRequest, 
    fetchWorkerDataSuccess, 
    fetchWorkerDataFailure, 
    fetchWorkerData,
    loginData,
    loginDataRequest,
    loginDataSuccess,
    loginDataFailure,
    registerDataRequest, 
    registerDataSuccess, 
    registerDataFailure, 
    registerData,
    addOrder
}

export default allActions
import {combineReducers} from 'redux'
import cart from './cart.js';
import categoryReducer from './categoryData';
import workerReducer from './workerData';
import loginReducer from './signin';
import registerReducer from './signup.js';
const rootReducer = combineReducers({
    cart,
    categoryReducer,
    workerReducer,
    loginReducer,
    registerReducer
})

export default rootReducer
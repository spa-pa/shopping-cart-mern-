import {createStore,applyMiddleware,combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './Reducers/AuthReducer';
import { cartReducer } from './Reducers/CartReducer';
import { orderReducer } from './Reducers/OrderReducer';
import { productReducer } from './Reducers/ProductReducer';

const initialState ={};
const composeEnhacer=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose
const store = createStore(
    combineReducers({
        products:productReducer,
        cart :cartReducer,
        order :orderReducer,
        user :authReducer
    }),
    initialState,
    composeEnhacer(applyMiddleware(thunk))
)

export default store;
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {cartReducer} from "./reducers/cartReducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import {userLoginReducer, userRegisterReducer} from "./reducers/userReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});
const cartItemsStorage = localStorage.getItem('cartItems');
const userInfoStorage = localStorage.getItem('userInfo');
const cartItemsFromStorage = cartItemsStorage ? JSON.parse(cartItemsStorage) : [];
const userInfoFromStorage = userInfoStorage ? JSON.parse(userInfoStorage) : null;
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

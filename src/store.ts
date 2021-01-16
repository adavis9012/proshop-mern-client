import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {cartReducer} from "./reducers/cartReducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from "./reducers/userReducers";

const reducer = combineReducers({
    cart: cartReducer,
    productDetails: productDetailsReducer,
    productList: productListReducer,
    userDetails: userDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
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

import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {cartReducer} from "./reducers/cartReducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
});
const cartItemsStorage = localStorage.getItem('cartItems');
const cartItemsFromStorage =  cartItemsStorage ? JSON.parse(cartItemsStorage) : [];
const initialState = {
	cart: {cartItems: cartItemsFromStorage},
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

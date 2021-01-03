import axios from 'axios';
import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../constants/productConstants";
import {ThunkAction} from "redux-thunk";
import {Action, Dispatch} from "redux";

export const listProducts = () => async(dispatch: any) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const {data} = await axios.get('api/products');

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            products: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

import axios from 'axios';
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";

export const listProducts = () => async(dispatch: any) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        });

        const {data} = await axios.get('/api/products');

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

export const listProductDetails = (id: string) => async(dispatch: any) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            product: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

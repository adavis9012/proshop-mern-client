import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../constants/productConstants";

export interface ProductInterface {
    _id: string
    image: string
    name: string
    description: string
    brand: string
    category: string
    price: number
    countInStock: number
    rating: number
    numReviews: number
}

export interface ProductListState {
    loading?: boolean
    products?: ProductInterface[]
    error?: string
}

interface Action extends ProductListState{
    type: 'PRODUCT_LIST_FAIL' | 'PRODUCT_LIST_REQUEST' | 'PRODUCT_LIST_SUCCESS'
}

export const productListReducer = (state: ProductListState = {products: []}, action: Action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.products,
            };
        case PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

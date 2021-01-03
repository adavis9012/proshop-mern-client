import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";

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

interface ProductListAction extends ProductListState {
    type: 'PRODUCT_LIST_FAIL' | 'PRODUCT_LIST_REQUEST' | 'PRODUCT_LIST_SUCCESS'
}

export interface ProductDetailsState {
    loading?: boolean
    product: ProductInterface
    error?: string
}

interface ProductDetailsAction extends ProductDetailsState {
    type: 'PRODUCT_DETAILS_FAIL' | 'PRODUCT_DETAILS_REQUEST' | 'PRODUCT_DETAILS_SUCCESS'
}

export const productListReducer = (state: ProductListState = {products: []}, action: ProductListAction) => {
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

export const productDetailsReducer = (state: ProductDetailsState = productDetailsDefaults, action: ProductDetailsAction) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const productDetailsDefaults: ProductDetailsState = {
    product: {
        _id: '',
        image: '',
        name: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
    },
};

import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export interface UserLoginInterface {
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

export interface UserLoginState {
    loading?: boolean
    userInfo?: UserLoginInterface
    error?: string
}

interface UserLoginAction extends UserLoginState {
    type: 'USER_LOGIN_SUCCESS'| 'USER_LOGIN_REQUEST'| 'USER_LOGIN_FAIL'| 'USER_LOGOUT'
}

interface UserRegisterAction extends UserLoginState {
    type: 'USER_REGISTER_SUCCESS'| 'USER_REGISTER_REQUEST'| 'USER_REGISTER_FAIL'
}

export const userLoginReducer = (state: UserLoginState | null = null, action: UserLoginAction) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.userInfo,
            };
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.error,
            };
        case USER_LOGOUT:
            return null;
        default:
            return state;
    }
};

export const userRegisterReducer = (state: UserLoginState | null = null, action: UserRegisterAction) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
            };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.userInfo,
            };
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

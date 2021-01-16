import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
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
    name: string
    email: string
}

export interface UserLoginState {
    loading?: boolean
    userInfo?: UserLoginInterface
    error?: string
}

export interface UserDetailsState {
    loading?: boolean
    user?: UserLoginInterface
    error?: string
}

interface UserLoginAction extends UserLoginState {
    type: 'USER_LOGIN_SUCCESS'| 'USER_LOGIN_REQUEST'| 'USER_LOGIN_FAIL'| 'USER_LOGOUT'
}

interface UserRegisterAction extends UserLoginState {
    type: 'USER_REGISTER_SUCCESS'| 'USER_REGISTER_REQUEST'| 'USER_REGISTER_FAIL'
}

interface UserDetailsAction extends UserLoginState {
    type: 'USER_DETAILS_SUCCESS'| 'USER_DETAILS_REQUEST'| 'USER_DETAILS_FAIL'
}

export const userLoginReducer = (state: UserLoginState | null = null, action: UserLoginAction): UserLoginState | null => {
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

export const userDetailsReducer = (state: UserDetailsState = {}, action: UserDetailsAction): UserDetailsState => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.userInfo,
            };
        case USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

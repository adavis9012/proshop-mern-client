import axios from "axios";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants";
import {UserInterface} from "../reducers/userReducers";

export const login = (email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const {data} = await axios.post(
            '/api/users/login',
            {
                email,
                password,
            },
            config,
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            userInfo: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const logout = () => (dispatch: any) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT});
};

export const register = (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const {data} = await axios.post(
            '/api/users',
            {
                name,
                email,
                password,
            },
            config,
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            userInfo: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            userInfo: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const getUserDetails = (id: string) => async (dispatch: any, getState: any) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const { userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.get(
            `/api/users/${id}`,
            config,
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            user: data,
        });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const updateUserProfile = (user: UserInterface) => async (dispatch: any, getState: any) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });

        const { userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(
            '/api/users/profile',
            user,
            config,
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            userInfo: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            userInfo: data,
        });
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}
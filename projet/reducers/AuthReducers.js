import {
    SIGNIN_ATTEMPT,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED,
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ISLOGGED_SUCCESS,
    ISLOGGED_FAILED,
    INITIALIZEUSER_ATTEMPT,
    INITIALIZEUSER_FAILED,
    INITIALIZEUSER_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    userId: null,
    loading: false,
    isLogged: false,
    error: '',
    initializeUser: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGNIN_ATTEMPT:
        case SIGNUP_ATTEMPT:
        case INITIALIZEUSER_ATTEMPT:
            return {
                ...state,
                loading: true,
                isLogged: false,
                error: '',
                user: null,
                userId: null,
            };
        case ISLOGGED_FAILED:
            return {
                ...state,
                error: 'is not logged'
            }
        case SIGNIN_FAILED:
        case SIGNUP_FAILED:
        case INITIALIZEUSER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
                isLogged: false,
            };
        case ISLOGGED_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user,
                userId: action.user._id,
                isLogged: true,
                error: '',
                initializeUser: action.user.InitializeUser
            };
        case INITIALIZEUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                error: '',
                initializeUser: false,
                user: action.user
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                error: '',
                initializeUser: true,
                userId: action.userId
            };
        case SIGNIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.user,
                isLogged: true,
                error: '',
                initializeUser: action.user.InitializeUser
            };
        default:
            return state;
    }
};
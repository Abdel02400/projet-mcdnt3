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
    INITIALIZEUSER_SUCCESS,
    UPDATEPROFIL_ATTEMPT,
    UPDATEPROFIL_FAILED,
    UPDATEPROFIL_SUCCESS,
    ADDPHOTO_ATTEMPT,
    ADDPHOTO_FAILED,
    ADDPHOTO_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    userId: null,
    loading: false,
    isLogged: false,
    error: '',
    initializeUser: false,
    addPhoto: false,
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
        case ADDPHOTO_ATTEMPT:
        case UPDATEPROFIL_ATTEMPT:
            return {
                ...state,
                loading: true,
                error: '',
            };
        case ISLOGGED_FAILED:
            return {
                ...state,
                error: 'is not logged'
            }
        case SIGNIN_FAILED:
        case SIGNUP_FAILED:
        case ADDPHOTO_FAILED:
        case UPDATEPROFIL_FAILED:
            return {
                ...this.state,
                loading: false,
                error: action.error,
                isLogged: false,
                addPhoto: false
            };
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
        case ADDPHOTO_SUCCESS:
        case UPDATEPROFIL_SUCCESS:
            return {
                ...this.state,
                addPhoto: true
            };
        case INITIALIZEUSER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                error: '',
                initializeUser: false,
                user: action.user,
                userId: action.user._id
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
                userId: action.user._id,
                isLogged: true,
                error: '',
                initializeUser: action.user.InitializeUser
            };
        default:
            return state;
    }
};
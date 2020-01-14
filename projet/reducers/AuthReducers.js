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
    ADDPHOTO_SUCCESS,
    GETFEED_ATTEMPT,
    GETFEED_FAILED,
    GETFEED_SUCCESS,
    ISLOGGED_ATTEMPT,
    GETPOST_ATTEMPT,
    GETPOST_FAILED,
    GETPOST_SUCCESS,
    ADDLIKE_FAILED,
    ADDLIKE_SUCCESS
} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    userId: null,
    loading: false,
    loadingAddPhoto: false,
    isLogged: false,
    error: '',
    feed: null,
    initializeUser: false,
    isaddPhoto: false,
    isFeed: false,
    postModal: null,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SIGNIN_ATTEMPT:
        case SIGNUP_ATTEMPT:
        case ISLOGGED_ATTEMPT:
            return Object.assign({}, state, {
                user: null,
                userId: null,
                loading: true,
                isLogged: false,
                error: action.error || '',
                feed: null,
                initializeUser: false,
                isaddPhoto: false,
                isFeed: false
            });
        case INITIALIZEUSER_ATTEMPT:
        case GETPOST_ATTEMPT:
        case UPDATEPROFIL_ATTEMPT:
            return Object.assign({}, state, {
                loading: true,
                error: ''
            });
        case ADDPHOTO_ATTEMPT:
            return Object.assign({}, state, {
                loadingAddPhoto: true,
                error: ''
            });
        case SIGNIN_FAILED:
        case SIGNUP_FAILED:
        case ISLOGGED_FAILED:
            return Object.assign({}, state, {
                user: null,
                userId: null,
                loading: false,
                isLogged: false,
                error: action.error || '',
                feed: null,
                initializeUser: false,
                isaddPhoto: false,
                isFeed: false
            });
        case ADDPHOTO_FAILED:
        case UPDATEPROFIL_FAILED:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
                isLogged: false,
                isaddPhoto: false
            });
        case INITIALIZEUSER_FAILED:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
                isLogged: false,
            });
        case GETPOST_FAILED:
            return Object.assign({}, state, {
                loading: false,
                error: action.error,
            });
        case ISLOGGED_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                user: action.user,
                userId: action.user._id,
                isLogged: true,
                error: '',
                initializeUser: action.user.InitializeUser,
            });
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLogged: true,
                error: '',
                initializeUser: true,
                userId: action.userId
            });
        case UPDATEPROFIL_SUCCESS:
        case ADDPHOTO_SUCCESS:
            return Object.assign({}, state, {
                isaddPhoto: true,
                user: action.user,
                loading: false,
            });
        case GETFEED_SUCCESS:
            return Object.assign({}, state, {
                feed: action.feed,
                isFeed: true
            });
        case GETFEED_FAILED:
            return Object.assign({}, state, {
                isFeed: false
            });
        case GETPOST_SUCCESS:
            return Object.assign({}, state, {
                postModal: action.post,
                loading: false,
            });
        case INITIALIZEUSER_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                isLogged: true,
                error: '',
                initializeUser: false,
                user: action.user,
                userId: action.user._id
            });
        case SIGNIN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                user: action.user,
                userId: action.user._id,
                isLogged: true,
                error: '',
                initializeUser: action.user.InitializeUser
            });
        default:
            return state;
    }
};
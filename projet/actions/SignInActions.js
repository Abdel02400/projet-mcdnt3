import {
    SIGNIN_ATTEMPT,
    SIGNIN_SUCCESS,
    SIGNIN_FAILED
} from "./types";

import AuthService from "../utils/AuthService";

export const SignInUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({type: SIGNIN_ATTEMPT});

        AuthService.signin(email, password)
        .then((data) => {
            handleResponse(dispatch, data)
        },(error) => {
            onSignInFailed(dispatch, 'Une erreur est survenu, merci de reesayer plus tard');
        })
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        let user = data.data;
        AuthService.setToken(token);
        onSignInSuccess(dispatch, user);
    }else onSignInFailed(dispatch, data.data);
};

const onSignInSuccess = (dispatch, user, token) => {
    dispatch({type: SIGNIN_SUCCESS, user, token})
};

const onSignInFailed = (dispatch, error) => {
    dispatch({type: SIGNIN_FAILED, error: error})
};


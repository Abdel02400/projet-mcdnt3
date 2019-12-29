import {
    SIGNUP_ATTEMPT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from "./types";

import AuthService from "../utils/AuthService";

export const SignUpUser = ({email, password, role}) => {
    return (dispatch) => {
        dispatch({type: SIGNUP_ATTEMPT});

        AuthService.signup(email, password, role)
            .then((data) => {
                handleResponse(dispatch, data)
            },(error) => {
                onSignUpFailed(dispatch, 'Une erreur est survenu, merci de reesayer plus tard');
            })

    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        AuthService.setToken(token);
        onSignUpSuccess(dispatch);
    }else onSignUpFailed(dispatch, data.data);
};

const onSignUpSuccess = (dispatch, user, token) => {
    dispatch({type: SIGNUP_SUCCESS, user, token})
};

const onSignUpFailed = (dispatch, error) => {
    dispatch({type: SIGNUP_FAILED, error: error})
};


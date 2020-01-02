import {
    ISLOGGED_SUCCESS,
    ISLOGGED_FAILED
} from "./types";

import AuthService from "../utils/AuthService";

export const IsLoggedUser = () => {
    return async (dispatch) => {

        let user = await AuthService.loggedIn()
        handleResponse(dispatch, user);
    };
};

const handleResponse = (dispatch, user) => {
    if(user) onIsLoggedSuccess(dispatch, user);
    else onIsLoggedFailed(dispatch);
};

const onIsLoggedSuccess = (dispatch, user) => {
    dispatch({type: ISLOGGED_SUCCESS, user})
};

const onIsLoggedFailed = (dispatch) => {
    dispatch({type: ISLOGGED_FAILED})
};

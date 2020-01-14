import {
    ISLOGGED_SUCCESS,
    ISLOGGED_FAILED,
    ISLOGGED_ATTEMPT
} from "./types";

import AuthService from "../utils/AuthService";

export const IsLoggedUser = () => {
    return async (dispatch) => {
        dispatch({type: ISLOGGED_ATTEMPT})

        let user = await AuthService.loggedIn();
        handleResponse(dispatch, user);
    };
};

const handleResponse = (dispatch, user) => {
    if(user) onIsLoggedSuccess(dispatch, user);
    else onIsLoggedFailed(dispatch, 'echec connexion' );
};

const onIsLoggedSuccess = (dispatch, user) => {
    dispatch({type: ISLOGGED_SUCCESS, user})
};

const onIsLoggedFailed = (dispatch, error) => {
    dispatch({type: ISLOGGED_FAILED, error})
};

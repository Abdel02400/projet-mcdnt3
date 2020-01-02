import {
    INITIALIZEUSER_ATTEMPT,
    INITIALIZEUSER_FAILED,
    INITIALIZEUSER_SUCCESS,
} from "./types";

import AuthService from "../utils/AuthService";

export const InitializeUser = ({lastname, firstname, description, avatar, id}) => {
    return async (dispatch) => {
        dispatch({type: INITIALIZEUSER_ATTEMPT});
        let data = await AuthService.InitializeUser(lastname, firstname, description, avatar, id);
        handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        let user = data.data;
        AuthService.setToken(token);
        onInitializeUserSuccess(dispatch, user);
    }
    else if(data.status === 401) onInitializeUserFailed(dispatch, data);
    else onInitializeUserFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const onInitializeUserSuccess = (dispatch, user) => {
    dispatch({type: INITIALIZEUSER_SUCCESS, user})
};

const onInitializeUserFailed = (dispatch, error) => {
    dispatch({type: INITIALIZEUSER_FAILED, error: error})
};

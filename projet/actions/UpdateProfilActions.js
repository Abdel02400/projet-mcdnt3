import {
    UPDATEPROFIL_ATTEMPT,
    UPDATEPROFIL_FAILED,
    UPDATEPROFIL_SUCCESS
} from "./types";

import AuthService from "../utils/AuthService";

export const UpdateProfil = (avatar, id) => {
    return async (dispatch) => {
        dispatch({type: UPDATEPROFIL_ATTEMPT});
        let data = await AuthService.UpdateProfil(avatar, id);
        handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        let user = data.data;
        AuthService.setToken(token);
        onUpdateProfilSuccess(dispatch, user);
    }
    else if(data.status === 401) onUpdateProfilSuccess(dispatch, data);
    else onUpdateProfilFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const onUpdateProfilSuccess = (dispatch, user) => {
    dispatch({type: UPDATEPROFIL_SUCCESS, user})
};

const onUpdateProfilFailed = (dispatch, error) => {
    dispatch({type: UPDATEPROFIL_FAILED, error: error})
};
import {
    GETPHOTO_ATTEMPT,
    GETPHOTO_FAILED,
    GETPHOTO_SUCCESS
} from "./types";

import AuthService from "../utils/AuthService";

export const getPhoto = (avatar, id) => {
    return async (dispatch) => {
        dispatch({type: GETPHOTO_ATTEMPT});
        let data = await AuthService.getPhoto(avatar, id);
        handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        let user = data.data;
        AuthService.setToken(token);
        onGetPhotoSuccess(dispatch, user);
    }
    else if(data.status === 401) onGetPhotoFailed(dispatch, data);
    else onGetPhotoFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const onGetPhotoSuccess = (dispatch, user) => {
    dispatch({type: GETPHOTO_SUCCESS, user})
};

const onGetPhotoFailed = (dispatch, error) => {
    dispatch({type: GETPHOTO_FAILED, error: error})
};
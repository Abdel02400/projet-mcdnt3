import {
    ADDPHOTO_ATTEMPT,
    ADDPHOTO_FAILED,
    ADDPHOTO_SUCCESS
} from "./types";

import AuthService from "../utils/AuthService";

export const addPhoto = (avatar, id) => {
    return async (dispatch) => {
        dispatch({type: ADDPHOTO_ATTEMPT});
        let data = await AuthService.addPhoto(avatar, id);
        handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let token = data.headers['x-auth'];
        let user = data.data;
        AuthService.setToken(token);
        onAddPhotoSuccess(dispatch, user);
    }
    else if(data.status === 401) onAddPhotoFailed(dispatch, data);
    else onAddPhotoFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const onAddPhotoSuccess = (dispatch, user) => {
    dispatch({type: ADDPHOTO_SUCCESS, user})
};

const onAddPhotoFailed = (dispatch, error) => {
    dispatch({type: ADDPHOTO_FAILED, error: error})
};
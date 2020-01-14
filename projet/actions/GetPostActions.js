import {
    GETPOST_ATTEMPT,
    GETPOST_SUCCESS,
    GETPOST_FAILED
} from "./types";

import AuthService from "../utils/AuthService";

export const getPostModal = (id) => {
    return async (dispatch) => {
        dispatch({type: GETPOST_ATTEMPT});
        let data = await AuthService.getPhotoOnServer(id);
        handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let post = data.data;
        ongetPostSuccess(dispatch, post);
    }
    else if(data.status === 401) ongetPostFailed(dispatch, data);
    else ongetPostFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const ongetPostSuccess = (dispatch, post) => {
    dispatch({type: GETPOST_SUCCESS, post})
};

const ongetPostFailed = (dispatch, error) => {
    dispatch({type: GETPOST_FAILED, error: error})
};
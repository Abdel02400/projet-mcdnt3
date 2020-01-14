import {
    ADDLIKE_ATTEMPT,
    ADDLIKE_FAILED,
    ADDLIKE_SUCCESS
} from "./types";

import AuthService from "../utils/AuthService";

export const addLikes = (idPhoto) => {
    return async (dispatch) => {
        alert(idPhoto)
        //let data = await AuthService.addLike(idPhoto);
        //handleResponse(dispatch, data);
    };
};

const handleResponse = (dispatch, data) => {
    if(data.status === 200){
        let post = data.data;
        onaddLikeSuccess(dispatch, post);
    }
    else if(data.status === 401) onaddLikeFailed(dispatch, data);
    else onaddLikeFailed(dispatch, 'une erreur serveur est survenu merci de reesayer ulteriement');
};

const onaddLikeSuccess = (dispatch, post) => {
    dispatch({type: ADDLIKE_SUCCESS, post})
};

const onaddLikeFailed = (dispatch, error) => {
    dispatch({type: ADDLIKE_FAILED, error: error})
};
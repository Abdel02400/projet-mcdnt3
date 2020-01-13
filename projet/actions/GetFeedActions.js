import {
    GETFEED_ATTEMPT,
    GETFEED_FAILED,
    GETFEED_SUCCESS
} from "./types";

import AuthService from "../utils/AuthService";

export const GetFeed = () => {
    return async (dispatch) => {
        let feed = await AuthService.getFeed()
        handleResponse(dispatch, feed);
    };
};

const handleResponse = (dispatch, feed) => {
    if(feed) getFeedSuccess(dispatch, feed);
    else getFeedFailed(dispatch);
};

const getFeedSuccess = (dispatch, feed) => {
    dispatch({type: GETFEED_SUCCESS, feed})
};

const getFeedFailed = (dispatch) => {
    dispatch({type: GETFEED_FAILED})
};
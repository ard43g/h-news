import { getNewStoriesList, getOneNews } from "../../api";
import {
    SET_ACTIVE_NEWS_ID,
    SET_ACTIVE_NEWS_BODY,
    SET_LAST_NEWS,
    SET_LOADING,
    SET_NEWS,
    SET_NEW_STORIES_LIST,
    UPDATE_NEWS,
    VISIBLE_NEWS,
} from "../../utils/consts";

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload,
    };
};
export const setNewStoriesList = (payload) => {
    return {
        type: SET_NEW_STORIES_LIST,
        payload,
    };
};
export const setLastNews = (payload) => {
    return {
        type: SET_LAST_NEWS,
        payload,
    };
};
export const setNews = (payload) => {
    return {
        type: SET_NEWS,
        payload,
    };
};
export const setActiveNewsId = (payload) => {
    return {
        type: SET_ACTIVE_NEWS_ID,
        payload,
    };
};
export const setActiveNewsBody = (payload) => {
    return {
        type: SET_ACTIVE_NEWS_BODY,
        payload,
    };
};

export const updateNews = (payload) => {
    return {
        type: UPDATE_NEWS,
        payload,
    };
};

export const fetchNewStoriesList = () => {
    return async (dispatch) => {
        await getNewStoriesList()
            .then((data) => data.json())
            .then((data) => dispatch(setNewStoriesList(data)));
    };
};

export const fetchNews = (payload) => {
    return async (dispatch) => {
        for (let i = 0; i < VISIBLE_NEWS; i++) {
            await getOneNews(payload[i])
                .then((data) => data.json())
                .then((data) => data !== null && dispatch(setNews(data)));
        }
    };
};
export const fetchUpdateNewStories = (payload) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        let result = [];
        for (let i = 0; i < payload.length; i++) {
            await getOneNews(payload[i])
                .then((data) => data.json())
                .then((data) => data !== null && result.push(data));
        }
        dispatch(updateNews(result));
        dispatch(setLoading(false));
    };
};

export const fetchActiveNewsPage = (payload) => {
    return async (dispatch) => {
        await getOneNews(payload)
            .then((data) => data.json())
            .then((data) => data !== null && dispatch(setActiveNewsBody(data)));
    };
};

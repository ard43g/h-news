import {
    SET_LOADING,
    SET_NEWS,
    SET_NEW_STORIES_LIST,
    SET_ACTIVE_NEWS_ID,
    SET_ACTIVE_NEWS_BODY,
    UPDATE_NEWS,
    SET_LAST_NEWS,
    VISIBLE_NEWS,
} from "../../utils/consts";

const initialState = {
    loading: false,
    error: false,
    newStoriesList: [],
    news: [],
    activeNewsId: null,
    activeNewsBody: null,
    lastNews: null,
    countVisibleNews: VISIBLE_NEWS,
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_NEW_STORIES_LIST:
            return {
                ...state,
                newStoriesList: action.payload,
            };
        case SET_NEWS:
            return {
                ...state,
                news: [...state.news, action.payload],
            };
        case SET_LAST_NEWS:
            return {
                ...state,
                lastNews: action.payload,
            };

        case SET_ACTIVE_NEWS_ID:
            return {
                ...state,
                activeNewsId: action.payload,
            };
        case SET_ACTIVE_NEWS_BODY:
            return {
                ...state,
                activeNewsBody: action.payload,
            };
        case UPDATE_NEWS:
            return {
                ...state,
                news: [...action.payload, ...state.news].slice(0, state.countVisibleNews),
            };
        default:
            return state;
    }
};

export default mainReducer;

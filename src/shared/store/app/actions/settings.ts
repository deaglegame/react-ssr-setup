import { Locale, Page, Notification } from '../types';

export const ActionTypes = {
    SETLOCALE: 'app/set-locale',
    // Settings
    PUSH_NOTIFICATION: "PUSH_NOTIFICATION",
    TOGGLE_THEME: "TOGGLE_THEME",
    UPDATE_TICKER_VALUE: "UPDATE_TICKER_VALUE",
    UPDATE_TICKERBAR_STATUS: "UPDATE_TICKERBAR_STATUS",
    UPDATE_SELECTED_LIST: "UPDATE_SELECTED_LIST",
    UPDATE_SELECTED_LIST_SUCCESS: "UPDATE_SELECTED_LIST_SUCCESS",
    CHANGE_PAGE: "CHANGE_PAGE",
    LOAD_NEWS: "LOAD_NEWS",
    LOAD_NEWS_SUCCESS: "LOAD_NEWS_SUCCESS",
    LOAD_BLOGS: "LOAD_BLOGS",
    LOAD_BLOGS_SUCCESS: "LOAD_BLOGS_SUCCESS",
};


// for reference
export const setLocale = (locale: Locale) => ({
    type: ActionTypes.SETLOCALE,
    payload: locale,
});


/* Settings Actions */

export const changePage = ({ page, symbol }: Page) => ({
    type: ActionTypes.CHANGE_PAGE,
    payload: {
        page: page,
        symbol: symbol
    }
});

export const pushNotification = ({ title, message, type, delay, callback }: Notification ) => ({
    type: ActionTypes.PUSH_NOTIFICATION,
    payload: {
        title: title,
        message: message,
        type: type,
        delay: delay,
        callback: callback
    }
})
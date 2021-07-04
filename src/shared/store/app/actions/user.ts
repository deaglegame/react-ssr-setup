import { UserLoginType } from '../types';

export const ActionTypes = {
    // User
    LOGIN_ATTEMPT: "LOGIN_ATTEMPT",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAIL: "LOGIN_FAIL",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};


/* Login actions */

export const login = ( user: UserLoginType ) => ({
    type: ActionTypes.LOGIN_ATTEMPT,
    payload: user
});
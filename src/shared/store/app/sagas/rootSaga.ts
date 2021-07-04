import "regenerator-runtime/runtime";
import { takeEvery, takeLatest, call, all } from 'redux-saga/effects';
import { ActionTypes as SettingsActions } from '../actions/settings';
import { ActionTypes as UserActions } from '../actions/user';



function* pushNotification() {
    console.log('pushNotification()');
};

function* login() {
    console.log('login()');
};

function* watchUser() {
    yield takeLatest( UserActions.LOGIN_ATTEMPT, login );
}

function* watchNotification() {
    yield takeLatest( SettingsActions.PUSH_NOTIFICATION, pushNotification );
};

export function* rootSaga() {
    yield all([
        watchUser(),
        watchNotification()
      ]);
};
/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import { AppState, SettingsState, UserState, Locale } from './types';

export const app = (state: { app: AppState }): AppState => state.app;
export const settings = (state: { settings: SettingsState }): SettingsState => state.settings;
export const user = (state: { user: UserState }): UserState => state.user;

export const getLocale = createSelector([app], (app): Locale => app.locale);

export const checkCurrentPage = createSelector(
    [settings],
    (settings): string => settings.current.page
);

export const checkUserState = createSelector(
    [user],
    (user): UserState => user
);

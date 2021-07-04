import { combineReducers } from 'redux';
import app from './app/reducer';
//import watchlist from './app/reducers/watchlist';
//import stocks from './app/reducers/stocks';
//import search from './app/reducers/search';
import settings from './app/reducers/settings';
import user from './app/reducers/user';

const createRootReducer = () =>
    combineReducers({
        app: app,
        //watchlist,
        //stocks,
        //search,
        settings: settings,
        user: user
    });

export default createRootReducer;



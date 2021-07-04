import { produce } from 'immer';
import { ActionTypes } from '../actions/settings';
import { Action, SettingsState } from '../types';

export const initialState = Object.freeze<SettingsState>({
    theme: 'dark',
    ticker: {
      isLoaded: false,
      status: 'PAUSED',
      display: 'PRICE',
      selected: {
        key: 'TRENDING',
        name: 'Trending'
      }
    },
    watchlist: {
      isLoaded: false,
      display: 'PRICE',
      selected: {
        key: '',
        name: ''
      }
    },
    trending: {
      isLoaded: false
    },
    featured: {
      isLoaded: false
    },
    country: 'US',
    current: {
      page: 'Home', // Home, Cryptos, Stocks, ... better way to define? included in array?
      symbol: ''
    },
    notification: {
      title: '',
      message: '',
      type: '',
      delay: 5000,
      callback: () => { console.log('..') }
    },
    error: ''
});

export default ( state: SettingsState = initialState, action: Action ): SettingsState =>
    produce(state, (draft) => {
        switch( action.type ) {
            case ActionTypes.CHANGE_PAGE:
              draft.current = { page: action.payload.page, symbol: action.payload.symbol };
              return;
            
            case ActionTypes.TOGGLE_THEME:
              const theme = draft.theme === 'dark' ? 'light' : 'dark';
              draft.theme = theme;
              return;
              
            case ActionTypes.UPDATE_TICKERBAR_STATUS:
              switch( action.payload ) {
                  case true:
                    draft.ticker = { ...draft.ticker, status: 'PLAYING' };
                  case false:
                    draft.ticker = { ...draft.ticker, status: 'PAUSED' };
              return;
            }
          
            case ActionTypes.UPDATE_SELECTED_LIST:
              draft.ticker = { ...draft.ticker, isLoaded: false, status: 'PAUSED' };
              return;
              
            case ActionTypes.UPDATE_SELECTED_LIST_SUCCESS:     
              const selectedList = action.payload.key;
              const selectedListName = action.payload.name;
              const listToUpdate = action.payload.list;
              const tickerBarWasPlaying = action.payload.wasPlaying;

              if( listToUpdate === 'TICKER_LIST' ) {
                draft.ticker = { ...draft.ticker, isLoaded: true, selected: { ...draft.ticker.selected, key: selectedList, name: selectedListName }, ...tickerBarWasPlaying && { status: 'PLAYING' } };
              } else if( listToUpdate === 'WATCHLIST' ) {
                draft.watchlist = { ...draft.watchlist, isLoaded: true, selected: { ...draft.ticker.selected, key: selectedList, name: selectedListName } };
              }
              return;
              
            case ActionTypes.PUSH_NOTIFICATION:
              draft.notification = { title: action.payload.title, message: action.payload.message, type: action.payload.type, delay: action.payload.delay, callback: action.payload.callback };
              return;

            /*
            case ActionTypes.LOAD_TRENDING:
              draft.trending.isLoaded = false;
              return;

            case ActionTypes.LOAD_TRENDING_DATA_SUCCESS:
              const trendingDataStatus = action.payload.data.length > 6;
              draft.trending.isLoaded = true;
              draft.ticker = { ...state.ticker, isLoaded: true, ...trendingDataStatus && { status: 'PLAYING' }};
              return;
        
            case ActionTypes.LOAD_FEATURED_DATA_SUCCESS:
              draft.featured.isLoaded = true;
              return;

            case ActionTypes.LOAD_WATCHLIST_DATA_SUCCESS:
              draft.watchlist.isLoaded = true;
              return;
            */

            default:
              return;
        }
    });

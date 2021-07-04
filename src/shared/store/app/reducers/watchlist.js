import { 
    UPDATE_WATCHLIST_SUCCESS, 
    LOAD_ALL_WATCHLISTS,
    LOAD_ALL_WATCHLISTS_SUCCESS,
    LOAD_TRENDING,
    LOAD_TRENDING_SUCCESS,
    LOAD_TRENDING_DATA_SUCCESS,
    LOAD_FEATURED,
    LOAD_FEATURED_SUCCESS,
    LOAD_FEATURED_DATA_SUCCESS,
    WATCHLIST_EMPTY,
    FETCH_WATCHLIST,
    UPDATE_TICKER_VALUE,
    TICKER_UPDATE, // mettre dans settings?
    GET_SPARK_CHARTS,
    GET_SPARK_CHARTS_SUCCESS,
    GET_CRYPTO_CHART_SUCCESS,
    CRYPTO_UPDATE,
    WS_SUBSCRIBE_SUCCESS,
    WS_UNSUBSCRIBE_CRYPTO,
    WS_SUBSCRIBE_CRYPTO_SUCCESS,
    WS_DISCONNECT,
    LOAD_WATCHLIST_DATA_SUCCESS,
    LOAD_NEWS,
    LOAD_NEWS_SUCCESS,
    LOAD_BLOGS,
    LOAD_BLOGS_SUCCESS,
    GET_TICKER_DATA,
    GET_TICKER_DATA_SUCCESS,
    //settings
    UPDATE_SELECTED_LIST,
    UPDATE_SELECTED_LIST_SUCCESS
} from '../actions/types'
import update from 'immutability-helper';
import { formatDecimals, checkForNull } from '../../helpers';

const initialState = {
    live: [],
    watchlists: {
        isLoaded: false,
        isFetching: false,
        isEmpty: true,
        selected: null,
        data: [
            /* For reference 
            {
                id: 0,
                name: Lorem ipsum
                isLoaded: false,
                list: [
                    id: 0,
                    symbol: XYZ
                ]
            }*/
        ]
    },
    //watchlists: [],
    trending: {
        'US': {
            isFetching: false,
            isLoaded: false,
            list: []
        },
        'CA': {
            isFetching: false,
            isLoaded: false,
            list: []
        }
    },
    featured: {
        isFetching: false,
        isLoaded: false,
        list: []
    },
    news: {
        isFetching: false,
        isLoaded: false,
        source: '',
        list: []
    }, // add categories?
    blogs: {
        isFetching: false,
        isLoaded: false,
        source: '',
        list: []
    }, // add categories?
    crypto: [{
        name: 'bitcoin',
        ticker: 'BTC',
        currencies: {
            usd: 0,
            cad: 0,
            eur: 0
        },
        data: []
      },
      {
        name: 'ethereum',
        ticker: 'ETH',
        currencies: {
            usd: 0,
            cad: 0,
            eur: 0
        },
        data: []
    }],
    // when more than one list, use to check if subscribed to websocket for that particular list to avoid subscribing more than once
    testSubscribed: false,
    testSubscribed2: false,
    error: {}
}

 export default function watchListReducer( state = initialState, action ) {

    switch( action.type ) {

        /* Ticker Actions */

        case TICKER_UPDATE:
            const listToUpdate = state.live;
            const updateData = action.payload.map( item => ({ ...item, price: formatDecimals( item.price ), changePercent: formatDecimals( item.changePercent ), updated: item.updated }));
            const updatedList = [];
            for(let i=0; i<listToUpdate.length; i++) {
                updatedList.push({
                    ...listToUpdate[i], 
                    ...(updateData.find( (itmInner) => {
                        return itmInner.ticker === listToUpdate[i].ticker 
                        })
                    )
                });
            }

            return { ...state, live: updatedList }
        
        case CRYPTO_UPDATE:
            const stateList2 = state.crypto;
            const resultList2 = action.payload;
            const updatedByTicker2 = [];
            for( let i=0; i < stateList2.length; i++ ) {
                updatedByTicker2.push({
                    ...stateList2[i], 
                    ...(resultList2.find( (item) => {
                        return item.ticker === stateList2[i].ticker 
                    }
                    ))}
                );
            }
            return { ...state, crypto: updatedByTicker2 }

        /* // Ticker Actions */


        /* All Watchlists Actions */

        case LOAD_ALL_WATCHLISTS:
            return { ...state, watchlists: { ...state.watchlists, isLoaded: false, isFetching: true }};
        
        case LOAD_ALL_WATCHLISTS_SUCCESS:
            const watchlists = action.payload;
            const stateWatchlists = watchlists.map( watchlist => ({ ...watchlist, isLoaded: false }));
            let liveListInit = [];
            let isEmpty = watchlists.length === 0;
            let selected = null;

            if( !isEmpty ) {
                selected = watchlists[0].id;
            }

            watchlists.map( watchlist => {
                watchlist.list.map( item => {
                    liveListInit.push({ id: item.id, symbol: item.symbol, price: null, changePercent: null, data: [] });
                });
            });
            // simulate array of different lists. to improve.
            return { ...state, 
                        watchlists: { 
                            ...state.watchlists, 
                            isLoaded: true, 
                            isFetching: false, 
                            isEmpty: isEmpty, 
                            selected: selected, 
                            data: stateWatchlists 
                        }, 
                        live: [ 
                            ...state.live, 
                            ...liveListInit 
                        ] 
                    };

        /* 
        
            Add / remove from watchlists,
            ######################################################
            ######## To do: Manage multiple watchlists ###########
            ######################################################

        */

            case UPDATE_WATCHLIST_SUCCESS:
                const updateId = action.payload.id;
                const updateTicker = action.payload.ticker;
                const updateType = action.payload.type;
                const updatePrice = action.payload.price;
                let newStockToWatchList = [];
                switch( updateType ) {
                    case 'ADD':
                        // Voir array / object
                        var toPush = { id: updateId, ticker: updateTicker, price: updatePrice };
                        newStockToWatchList = update( state.list, {$push: [toPush]} );
                }
                
                //return { ...state, list: newStockToWatchList }
  
        /*
        Still useful?
        Use for single watchlist?
        */

        case WATCHLIST_EMPTY:
            console.log( 'WATCHLIST_EMPTY' );
            return { ...state, isEmpty: true };

        case LOAD_WATCHLIST_DATA_SUCCESS:

            const stateWatchlist = state.watchlists.data;
            const dataList = action.payload.data;
            const watchlistId = action.payload.watchlistId;

            const updatedById = stateWatchlist.map( watchlist => {
                if( watchlist.id === watchlistId ) {
                    const updatedWatchlist = [];
                    const list = [ ...watchlist.list ];
                    for( let i=0; i < list.length; i++ ) {
                        updatedWatchlist.push({
                            ...list[i], 
                            ...(dataList.find( (item) => {
                                return item.ticker === list[i].ticker 
                            }
                            ))}
                        );
                    }
                    return { ...watchlist, list: updatedWatchlist, isLoaded: true };
                } else {
                    return watchlist;
                }
            });

            return { ...state, watchlists: { ...state.watchlists, data: updatedById }};

        case GET_SPARK_CHARTS:
            return { ...state, isFetching: true }

        case GET_SPARK_CHARTS_SUCCESS:
            const listToUpdate1 = state.live;
            const tData = action.payload;
            const updatedList1 = [];
            
            for(let i=0; i<listToUpdate1.length; i++) {
                let itemFormatted;
                const findIndex = tData.findIndex( itm => itm.ticker === listToUpdate1[i].symbol );
                const item = findIndex !== -1 ? tData[findIndex] : listToUpdate1[i];

                const priceFormatted = item.price ? formatDecimals( item.price ) : null;
                const changePercentFormatted = item.changePercent ? formatDecimals( item.changePercent ) : null;
                const changePriceFormatted = item.changePrice ? formatDecimals( item.changePrice ) : null;
                itemFormatted = { ...item, price: priceFormatted, changePercent: changePercentFormatted, changePrice: changePriceFormatted, data: checkForNull( [...item.data] ) };
                
                updatedList1.push({
                    ...listToUpdate1[i], 
                    ...itemFormatted
                });
            }
            return { ...state, isFetching: false, live: updatedList1 }

        case GET_CRYPTO_CHART_SUCCESS:
            const payloadCrypto = [action.payload];
            const tickerCrypto = action.payload.ticker;
            const dataCrypto = action.payload.data;
            const cryptoList = state.crypto;
            let updatedCryptoList = [];
            let found = false;
            for( let i=0; i<cryptoList.length; i++ ) {
                updatedCryptoList.push({
                    ...cryptoList[i], 
                    ...(payloadCrypto.find( item => {
                        const t = item.ticker;
                        return t === cryptoList[i].ticker 
                    } ))}
                );
            }

            return { ...state, crypto: updatedCryptoList };


        case GET_TICKER_DATA:
            return { ...state, isFetching: true }

        case GET_TICKER_DATA_SUCCESS:
            const listToUpdate2 = state.live;
            const tData2 = action.payload;
            const updatedList2 = [];
            
            for(let i=0; i<listToUpdate2.length; i++) {
                let itemFormatted;
                const findIndex = tData2.findIndex( itm => itm.ticker === listToUpdate2[i].symbol );
                const item = findIndex !== -1 ? tData2[findIndex] : listToUpdate2[i];

                const priceFormatted = item.price ? formatDecimals( item.price ) : null;
                const changePercentFormatted = item.changePercent ? formatDecimals( item.changePercent ) : null;
                const changePriceFormatted = item.changePrice ? formatDecimals( item.changePrice ) : null;
                itemFormatted = { ...item, price: priceFormatted, changePercent: changePercentFormatted, changePrice: changePriceFormatted, data: checkForNull( [...item.data] ) };
                
                updatedList2.push({
                    ...listToUpdate2[i], 
                    ...itemFormatted
                });
            }

            console.log('updatedList2');
            console.log( updatedList2 );
            return { ...state, isFetching: false, live: updatedList2 }

        case LOAD_TRENDING:
            const trendingDataCountry1 = action.payload.country;
            return { ...state, trending: { ...state.trending, [trendingDataCountry1]: { ...state.trending[trendingDataCountry1], isLoaded: false, isFetching: true } } };

        case LOAD_TRENDING_SUCCESS:
            const all = [ ...state.watchlists.data ];
            const trendingCountry = action.payload.country;
            const newTrendingList = action.payload.data.map( item => {
                for( let i = 0; i < all.length; i++ ) {
                  const watching = all[i].list.some( item2 => item === item2.symbol );
                  if( watching ) { 
                    return { id: 0, symbol: item, watching: true };
                  } else {
                    return { id: 0, symbol: item };
                  }
                }
            });

            return { ...state, trending: { ...state.trending, [trendingCountry]: { ...state.trending[trendingCountry], list: newTrendingList } } };

        case LOAD_TRENDING_DATA_SUCCESS:
            const liveList = [ ...state.live ];
            const trendingCountry2 = action.payload.country;
            const trendingData = action.payload.data;
            const newLiveList = liveList.concat( trendingData );

            return { ...state, live: newLiveList, trending: { ...state.trending, [trendingCountry2]: { ...state.trending[trendingCountry2], isLoaded: true, isFetching: false } } };


        case LOAD_FEATURED:
            return { ...state, featured: { ...state.featured, isLoaded: false, isFetching: true } };

        case LOAD_FEATURED_SUCCESS:
            const liveList2 = state.live;
            const featuredData = action.payload.map( item => ({ id: item.id, symbol: item.symbol, price: null, changePercent: null, data: [] }) );
            const newLiveList2 = liveList2.concat( featuredData );
            const featuredSymbols = action.payload.map( item => item );
            return { ...state, live: newLiveList2, featured: { ...state.featured, list: featuredSymbols }};

        case LOAD_FEATURED_DATA_SUCCESS:
            return { ...state, featured: { ...state.featured, isLoaded: true, isFetching: false }};





        case WS_SUBSCRIBE_SUCCESS:
            const successSubs = action.payload;
            const liveList3 = state.live;
            const liveListUpdated = liveList3.map( item => {
                let r = item;
                for( let i=0; i<successSubs.length; i++ ) {
                    if( successSubs[i].ticker === item.ticker ) {
                        r = { ...item, sub: true };
                        break; 
                    }
                }
                return r;
            });

            return { ...state, live: liveListUpdated };

        case WS_SUBSCRIBE_CRYPTO_SUCCESS:
            return { ...state, testSubscribed2: true };

        case WS_UNSUBSCRIBE_CRYPTO:
            return { ...state, testSubscribed2: true };
        
        /*
        case WS_CONNECT:
            return { ...state, testSubscribed: false, testSubscribed2: false };
        */

        case WS_DISCONNECT:
            return { ...state, testSubscribed: false, testSubscribed2: false };
        
        case LOAD_NEWS:
            return { ...state, news: {...state.news, isLoaded: false, isFetching: true } };

        case LOAD_NEWS_SUCCESS:
            const newsList = action.payload.list;
            const newsSource = action.payload.source;
            return { ...state, news: {...state.news, isLoaded: true, isFetching: false, source: newsSource, list: newsList } };

            
        case LOAD_BLOGS:
            return { ...state, news: {...state.news, isLoaded: false, isFetching: true } };

        case LOAD_BLOGS_SUCCESS:
            const blogList = action.payload.list;
            const blogSource = action.payload.source;
            return { ...state, blogs: {...state.blogs, isLoaded: true, isFetching: false, source: blogSource, list: blogList } };
    
        default:
            return { ...state };
    }
}
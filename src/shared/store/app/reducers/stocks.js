import {
    FETCH_STATUS,
    GET_COMPANY_INFO,
    GET_COMPANY_INFO_SUCCESS,
    GET_COMPANY_STATS_SUCCESS,
    GET_COMPANY_DATA_SUCCESS,
    GET_COMPANY_CALENDAR_SUCCESS,
    GET_INTRADAY_DATA,
    GET_INTRADAY_DATA_SUCCESS,
    GET_RANGE_DATA_SUCCESS,
    GET_INTRADAY_DATA_FAIL,
    GET_CHART_DATA_SUCCESS,
    GET_CHART_DATA_FAIL,
    UPDATE_STOCK_DATA,
    GET_ALL_STOCKS_SUCCESS,
    GET_SYMBOLS_BY_TAG,
    GET_SYMBOLS_BY_TAG_SUCCESS,
    GET_SYMBOLS_BY_TAG_FAIL,
    GET_COMPANY_FINANCIALS,
    GET_COMPANY_FINANCIALS_SUCCESS,
    GET_COMPANY_NEWS_SUCCESS
} from '../actions/types';
import { isTrading } from '../../helpers';

//rename 'list' tickerList, companiesList
const initialState = {
    all: [],
    companyInfo: [],
    companyStats: [],
    companyData: [],
    intraday: [],
    historical: {
        '1D': [],
        '5D': [],
        '1M': [],
        '6M': [],
        '1Y': [],
        '5Y': [],
        'ALL': []
    },
    chart: [],
    tags: {
        isLoaded: false,
        tickers: [],
        selected: '',
        error: {
            status: false,
            message: ''
        }
    },
    // change for isFetching in intraday and historical
    isFetching: false,
    isTrading: false,
    error: {
        status: false,
        type: '',
        message: ''
    }
}
  
export default function stocksReducer( state = initialState, action ) {
    switch( action.type ) {

        case FETCH_STATUS:
            //console.log( 'FETCH_STATUS' );
            //console.log( action.payload );
            return { ...state, isFetching: action.payload }

        case GET_ALL_STOCKS_SUCCESS:
            //console.log( 'GET_ALL_STOCKS_SUCCESS' );
            //console.log( action.payload );
            return { ...state, all: action.payload }


        case GET_SYMBOLS_BY_TAG:
            //console.log( 'GET_SYMBOLS_BY_TAG' );
            //console.log( action.payload );
            return { ...state, tags: { ...state.tags, selected: '', tickers: '', isFetching: true, isLoaded: false, error: { status: false, message: '' }}};

        case GET_SYMBOLS_BY_TAG_SUCCESS:
            //console.log( 'GET_SYMBOLS_BY_TAG_SUCCESS' );
            //console.log( action.payload );
            const tagResult = action.payload;
            const tagData = tagResult.length !== 0 ? tagResult : []
            return { ...state, tags: { ...state.tags, selected: tagResult.selected, tickers: tagData, isFetching: false, isLoaded: true }};

        case GET_SYMBOLS_BY_TAG_FAIL:
            return { ...state, tags: { ...state.tags, selected: '', tickers: '', isFetching: false, isLoaded: false, error: { status: true, message: action.payload.message }}};
 
        case GET_COMPANY_DATA_SUCCESS:
            const companyData = action.payload.data;
            const companyCalendar = action.payload.calendar;

            const companyStateData = {
                ticker: companyData.company.ticker,
                stats: companyData.company.company_stats[0],
                info: companyData.company,
                calendar: { 
                    isLoaded: false,
                    items: [],
                },
                news: { isLoaded: false },
                financials: { balance: [], cash: [], earnings: [], income: [], isLoaded: false, isFetching: false }
            }
            return { ...state, companyData: [ ...state.companyData, companyStateData ] }
        
        case GET_COMPANY_NEWS_SUCCESS:
            const newsState = [ ...state.companyData ]
            const newsTicker = action.payload.ticker;
            const newsData = action.payload.data;

            const companyDataWithNews = newsState.map( item => {
                if( item.ticker === newsTicker ) {
                    return { ...item, news: { isLoaded: true, ...newsData } };
                } else {
                    return { ...item };
                }
            });

            return { ...state, companyData: companyDataWithNews };
    
        case GET_COMPANY_CALENDAR_SUCCESS:
            const calendarState = [ ...state.companyData ]
            const calendarTicker = action.payload.ticker;
            const calendarData = action.payload.data;

            const companyDataWithCalendar = calendarState.map( item => {
                if( item.ticker === calendarTicker ) {
                    return { ...item, calendar: { isLoaded: true, list: [ ...calendarData ] } };
                } else {
                    return { ...item };
                }
            });

            return { ...state, companyData: companyDataWithCalendar };

        case GET_COMPANY_FINANCIALS:
            const financialSymbol1 = action.payload.symbol;
            const financialState1 = [ ...state.companyData ];

            //findAndUpdate( ticker, data)

            const updatedFinancials1 = financialState1.map( item => {
                if( item.ticker === financialSymbol1 ) {
                    return { ...item, financials: { ...item.financials, isFetching: true }};
                } else {
                    return { ...item };
                }
            });

            return { ...state, companyData: updatedFinancials1 };

        case GET_COMPANY_FINANCIALS_SUCCESS:
            const financialSymbol2 = action.payload.symbol;
            const financialData2 = action.payload.data;
            const financialState2 = [ ...state.companyData ];
            const newBalance = financialData2.filter( item => item.type === 'BALANCE_SHEET' );
            const newCash = financialData2.filter( item => item.type === 'CASH_FLOW' );
            const newIncome = financialData2.filter( item => item.type === 'INCOME_STATEMENT' );
            const newEarnings = financialData2.filter( item => item.type === 'EARNINGS' );
            const newFinancialItem2 = { balance: newBalance, cash: newCash, earnings: newEarnings, income: newIncome, isLoaded: true, isFetching: false };

            const updatedFinancials2 = financialState2.map( item => {
                if( item.ticker === financialSymbol2 ) {
                    return { ...item, financials: newFinancialItem2 };
                } else {
                    return { ...item };
                }
            });

            return { ...state, companyData: updatedFinancials2 };


        case GET_INTRADAY_DATA_SUCCESS:
            const resultIsTrading = action.payload.debugIsTrading;
            const intradayChartData = action.payload.data;

            const intradayData = {
                ticker: action.payload.ticker,
                dateStart: action.payload.dateStart,
                timeStart: action.payload.timeStart,
                timeEnd: action.payload.timeEnd,
                source: action.payload.source,
                currentPrice: action.payload.current,
                dayHigh: action.payload.dayHigh,
                dayLow: action.payload.dayLow,
                dayChange: action.payload.dayChange,
                previousClosePrice: action.payload.previousClosePrice,
                currency: action.payload.currency,
                data: intradayChartData
            }
            
            let found1 = false;
            const intradayListState = state.intraday;
            const updatedIntraday = [];
            const tIntraday = intradayListState.map( item => {
                if( item.ticker === intradayData.ticker ) {
                    found1 = true;
                    return intradayData;
                } else {
                    return item;
                }
            });
            if( found1 === false ) { updatedIntraday.push( intradayData ); }
            const returnIntraday = updatedIntraday.concat( tIntraday );
            return { ...state, isFetching: false, isTrading: resultIsTrading, intraday: returnIntraday };

            //return { ...state, isFetching: false, intraday: [ ...state.intraday, intradayData ], historical: { ...state.historical, '1D': [intradayData] } }


        case GET_RANGE_DATA_SUCCESS:
            console.log( 'GET_RANGE_DATA_SUCCESS' );
            console.log( action.payload );

            const rangeItem = action.payload;
            const rangeTicker = rangeItem.data.ticker;
            const range = rangeItem.range;
            const rangeListState = state.historical[range];
    
            const rangeData = {
                ticker: action.payload.data.ticker,
                dateStart: action.payload.data.dateStart,
                timeStart: action.payload.data.timeStart,
                timeEnd: action.payload.data.timeEnd,
                source: action.payload.data.source,
                range: action.payload.range,
                previousClosePrice: action.payload.data.previousClosePrice,
                currency: action.payload.data.currency,
                data: action.payload.data.data
            }

            let found2 = false;
            const updatedRange = [];
            const tRange = rangeListState.map( item => {
                if( item.ticker === rangeTicker ) {
                    found2 = true;
                    return rangeData;
                } else {
                    updatedRange.push( rangeData );
                    return item;
                }
            });
            if( found2 === false ) { updatedRange.push( rangeData ); }
            return { ...state, historical: { ...state.historical, [range]: updatedRange.concat( tRange ) } };
    
        default:
            return { ...state, isTrading: isTrading() };

    }
}
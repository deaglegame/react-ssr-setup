import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Loading } from './Loading';
import Symbol from './Symbol';
// import Marquee from "react-fast-marquee";
import Malarquee from 'react-malarquee';
import { checkWatchlistState, checkUserState, checkTickerListState } from '../redux/selectors';
import { calcStatus, bullOrBear, priceChange, percentChange } from '../helpers';

export function TickerBarList( props ) {

    const dispatch = useDispatch();
    // no logic in component, change for "checkTickerListState" that supplies currently selected list
    //const watchlist = useSelector( state => checkWatchlistState( state ) );

    const user = useSelector( state => checkUserState( state ) );
    const tickerList = useSelector( state => checkTickerListState( state ) );
    const isLoggedIn = user.isLoggedIn;
    const selected = tickerList.selectedList ? tickerList.selectedList.key : 0;
    const listLoaded = tickerList.isLoadedList;
    const dataLoaded = tickerList.isLoadedData;
    const displayValue = tickerList.displayValue;
    const fill = tickerList.list.length > 6;
    const isEmpty = false;
    let list = [];

    if( listLoaded ) {
      list = tickerList.list.map( (item) => {
          const value = item.price;
          const changePercent = item.changePercent;
          const watching = item.watching === true ? true : false;
          const status = changePercent ? ( Math.sign( changePercent ) === 1 ? 'bullish' : 'bearish' ) : '';
          const displayPrice = '$'+value;
          const displayPercent = (status==='bullish'?'+':'')+changePercent+'%';
          const display = tickerList.selectedList === 'TRENDING' ? displayPrice + ' ' + displayPercent : displayPrice;
          return {
              symbol: item.symbol,
              watching: watching,
              changePercent: item.changePercent,
              value: value,
              displayValue: displayPrice,
              displayChange: displayPercent,
              status: status 
          }
      });
    }

    return { 
        watchlist: list, 
        isLoadedList: listLoaded,
        isLoadedData: dataLoaded,
        fill: fill,
        isEmpty: isEmpty,
        isLoggedIn: isLoggedIn
    }
    


    const { watchlist, isLoadedList, isLoadedData, fill, isEmpty, isLoggedIn } = useTickerList( props );
    if ( !isLoadedList && !isEmpty && isLoggedIn ) {
      return <Loading size="small" className="pl-3" />
    } else {
      if( !isLoggedIn ) {
        return <span className="pl-30">Log in to view your watchlists</span>
      } else if( isEmpty ) {
        return <span className="pl-30">Watchlist is empty</span>
      } else {
        return ( 
          <Malarquee hoverToPause={true} rate={ props.play ? 40 : 0 } fill={fill}>
            <div className="pl-30" style={{ display: 'flex', width:'100%' }}>{ watchlist.map( (item, i) => <Symbol key={item.symbol} data={item} isLoading={!isLoadedData} value={item.value} /> ) }</div>  
          </Malarquee>
        )
      }
    }
}
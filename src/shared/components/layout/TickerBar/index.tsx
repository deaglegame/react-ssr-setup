import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TickerBarContainer, MarketStatusBlob } from '../../../styles';
import { TickerBarList } from './list';


/* Ticker Bar */

interface TickerBarProps {
    isSubscribed: boolean,
    isTrading: boolean,
};

export function TickerBar( props: TickerBarProps ): JSX.Element {
    const isSubscribed = props.isSubscribed;
    const isTrading = props.isTrading;
    return (
        <TickerBarContainer>
            <TickerBarSettings />
            <MarketStatus isSubscribed={isSubscribed} isTrading={isTrading} />
            <TickerBarDisplay />
        </TickerBarContainer>
    );
};

/* // */

/* TickerBarSettings */

function TickerBarSettings(): JSX.Element {
    const btnPlay = <FontAwesomeIcon icon="play" />
    const btnPause = <FontAwesomeIcon icon="pause" />
    const btnGear = <FontAwesomeIcon icon="cog" />
    const selectedList = useSelector( state => state.settings.ticker.selected );
    const stateTickerBarStatus = useSelector( state => state.settings.ticker.status );
    const userWatchlists = useSelector( state => state.watchlist.watchlists.data );

    let btnRender: JSX.Element;
    let isPlaying: Boolean;

    switch( stateTickerBarStatus ) {
        case 'PLAYING':
            btnRender = btnPause
            isPlaying = true
            break
        case 'PAUSED':
            btnRender = btnPlay
            isPlaying = false
            break
    }

    const dispatch = useDispatch();
    const handleChange = ( key: string, e: React.ChangeEvent<HTMLInputElement> ) => dispatch( updateTickerValue( key, 'HEADER' ) );
    const handleClick = ( e: MouseEvent ) => {
        return dispatch( updateTickerBarStatus( !isPlaying ) )
    }
    const handleSelectedListChange = ( key, e ) => {
        const name = e.target.innerText;
        const list = key.indexOf('_') !== -1 ? parseInt( key.split('_')[1] ) : key;
        dispatch( updateSelectedList( list, name, stateTickerBarStatus, 'TICKER_LIST' ) );
    };
    const listWatchlists = (): Array<JSX.Element> => userWatchlists.map( list => <Dropdown.Item key={list.id} eventKey={"WATCHLIST_"+list.id}>{list.name}</Dropdown.Item> );

    return (
        <div className="tickerbar-settings">

            <Dropdown onSelect={handleSelectedListChange}>
                <Dropdown.Toggle className="btnDostrik optnTicker w-80">
                    { selectedList.name }
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item key="TRENDING" eventKey="TRENDING">Trending</Dropdown.Item>
                    <Dropdown.Item key="INDEX" eventKey="INDEX">Major Indexes</Dropdown.Item>
                    <Dropdown.Divider />
                    { listWatchlists() }
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown onSelect={handleChange}>
                <Dropdown.Toggle className="btnDostrik optnTicker ml-2">
                    {btnGear}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item key="4" eventKey="PRICE">Price</Dropdown.Item>
                    <Dropdown.Item key="5" eventKey="PRICE_CHANGE">Price Change</Dropdown.Item>
                    <Dropdown.Item key="6" eventKey="PERCENT_CHANGE">Percent Change</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <div>
                <Button id="ctrl-ticker" className="btnDostrik ml-2" onClick={handleClick}>{btnRender}</Button>
            </div>
            
        </div>
    )
};

/* // */

/* MarketStatus */

interface MarketStatusProps {
    isSubscribed: boolean,
    isTrading: boolean,
};

function MarketStatus( props: MarketStatusProps ): JSX.Element {
    const color = props.isSubscribed ? 'green' : ( props.isTrading ? 'red' : 'grey' );
    const tip = props.isSubscribed ? 'Live Market Data' : ( props.isTrading ? 'Stock Market Open' : 'Stock Market Closed' );
    return <MarketStatusBlob color={color} data-tip={tip}  />;
};

/* // */

/* TickerBarDisplay */

function TickerBarDisplay(): JSX.Element {
    const refKey = useRef<Boolean | undefined>();
    const refPaused = useRef<Boolean | undefined>();
    const [ key, setKey ] = useState<number>( 17 );

    //const stateTickerBarStatus = useSelector( state => state.settings.ticker.status );
    // temp
    const stateTickerBarStatus = 'PLAYING';

    const pseudoRand = (): number => Math.floor( Math.random() * 10000 );
    const randomize = (): number => {
        const rand = pseudoRand();
        return rand !== key ? rand : pseudoRand();
    };
    
    //const tickerList = useSelector( state => checkTickerListState( state ) );
    //const selected = tickerList.selectedList ? tickerList.selectedList.key : 0;

    useEffect( () => {
        if( !refKey.current ) {
            refKey.current = true;
        } else {
            setKey( randomize() );
        }
    }, [ /*selected*/ ]);

    const isPaused = () => {
        /*switch( stateTickerBarStatus ) {
            case 'PAUSED':
                return true
            case 'PLAYING':
                if( !refPaused.current ) {
                    return false
                } else {
                    return true
                }
        }*/

        // temp
        return false;
        
    }

    const setIsPaused = ( val: Boolean ): void => {
        if( val ) {
            if( stateTickerBarStatus == 'PLAYING' ) {
                refPaused.current = true;
                //return setHoverPause( true )
            }
        } else {
            if( stateTickerBarStatus == 'PLAYING' ) {
                refPaused.current = false;
                //return setHoverPause( false )
            }
        }
    }

    return (
        <div id="featured-list"
            onMouseEnter={() => setIsPaused( true )}
            onMouseLeave={() => setIsPaused( false )}
            >
                {
                    // <TickerBarList key={key} play={!isPaused()} delay={1} pauseOnHover={true} pauseOnClick={true} speed={65} gradientWidth={20} gradientColor={[16,25,31]} />
                }
                
        </div>
    ); 
};

/* // */
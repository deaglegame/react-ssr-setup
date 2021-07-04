import React, { useEffect, useState, useRef, memo } from 'react';
import 'simplebar';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
//import { updateSearchResults } from '../../redux/selectors';
//import { search } from '../../redux/actions';
import { useVisible } from '../../hooks';


export function SearchForm(): JSX.Element {

    const dispatch = useDispatch();
    //const { list, lastFetch, isLoaded } = useSelector( updateSearchResults );
    // temp
    const { list, lastFetch, isLoaded } = { list: [], lastFetch: '', isLoaded: false };

    // voir si utile?
    /*useEffect(() => {
        if ( searchForm.length ) {
            
        }
    }, [searchForm]);*/
    
    const [ searchValue, setSearchValue ] = useState<string>('');
    const { ref, isVisible, setIsVisible } = useVisible( false );

    // find fix for "as any"?
    const searchBar = useRef<HTMLInputElement>(null);
    
    function handleSearchForm( e: React.ChangeEvent<HTMLInputElement> ) {
        setSearchValue( e.target.value );
        //dispatch( search( e.currentTarget.value, lastFetch ) );
        
        // ref instead?
        setIsVisible( true );
    }
    function resetSearch( e: MouseEvent ) {
        //dispatch( search( '', lastFetch ) );
        setSearchValue('');

        // ref instead?
        setIsVisible( false );
    }
    function handleFocusIfNotEmpty() {
        if( searchValue !== '' ) {
            setIsVisible( true );
        }   
    }
   
    return (
        <Form className="headerSearchForm my-2 my-md-0 order-md-3" autoComplete="off" ref={ref as any}>
            <Form.Control 
                ref={searchBar as any} 
                className="form-control" 
                id="dstrkSearch" 
                type="text" 
                placeholder="Symbol, Company Name, ... " 
                autoComplete="off"
                aria-label="Search" 
                onChange={handleSearchForm} 
                onFocus={handleFocusIfNotEmpty} 
                value={searchValue} 
                />
            <div className={ isVisible ? 'searchResults' : 'searchResults hide' } data-simplebar>
                <ul>
                    {
                        isLoaded && list.length === 0 ?
                            <Result empty={true} query={searchValue} /> :
                            list.slice( 0, 10 ).map( ( item: ListItem ): JSX.Element => (
                                    <Result 
                                        key={item.ticker} 
                                        empty={false} 
                                        query={searchValue} 
                                        ticker={item.ticker} 
                                        name={item.name} 
                                        onClick={resetSearch} 
                                        />
                                )
                            )
                    }
                </ul>
            </div>
        </Form>
    )

}

interface ListItem {
    ticker: string,
    name: string
}

interface SearchResultProps {
    key?: string,
    empty: Boolean,
    query: string,
    ticker?: string,
    name?: string,
    onClick?: Function
}

// (p, n) => p.ticker === n.ticker ? true : false même chose que function isEqual( prev, next ) ...
const Result = memo<SearchResultProps>( SearchResult, (p, n) => p.ticker === n.ticker ? true : false );

function SearchResult( props: SearchResultProps ): JSX.Element {
    const message = props.query.length === 1 ? 'Specify at least 2 characters' : 'No results';
    const empty = props.empty;
    // see if works :
    const onClick = !empty && { onClick: props.onClick };
    return(
        <li>
            {
                empty === true ?
                    <div className="emptyResult">
                        <span>{message}</span>
                    </div> :
                    <Link to={"/symbol/"+props.ticker} { ...onClick }>
                        <span>{props.ticker}</span>
                        <span>{props.name}</span>
                    </Link>
            }
        </li>
    )
}
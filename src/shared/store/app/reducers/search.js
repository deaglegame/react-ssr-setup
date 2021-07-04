import {
    SEARCH_QUERY_UPDATE,
    SEARCH_QUERY_SUCCESS,
    SEARCH_RESET } 
from '../actions/types'

const initialState = {
    lastFetch: '',
    searchResults: [],
    searchQuery: '',
    searchResultsLoaded: false,
    error: {}
}

export default function searchReducer( state = initialState, action ) {

    switch( action.type ) {
        case SEARCH_QUERY_UPDATE:
          return {...state, searchQuery: action.payload }
  
        case SEARCH_QUERY_SUCCESS:
          return {...state, searchResults: action.payload.data, searchResultsLoaded: true, lastFetch: action.payload.query } //ajouter nouveau input et longueur aussi dans le rootSaga
      
        case SEARCH_RESET:
          return {...state, lastFetch: '', searchQuery: '', searchResults: [], searchResultsLoaded: false } //ajouter nouveau input et longueur aussi dans le rootSaga
          
        default:
          return state
    }

}
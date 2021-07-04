import { produce } from 'immer';
import { ActionTypes } from '../actions/user';
import { Action, UserState } from '../types';

export const initialState = Object.freeze<UserState>({
    isLoggedIn: false,
    isLoading: false,
    isPosting: false,
    info: {
        id: 0,
        username: '',
        lastLogin: 0
    },
    error: ''
});
  
export default ( state: UserState = initialState, action: Action ): UserState =>
    produce(state, (draft) => {
        switch( action.type ) {
            case ActionTypes.LOGIN_ATTEMPT:
                draft.isLoading = true;
                return;
                
            case ActionTypes.LOGIN_SUCCESS:
                draft = { ...draft, isLoading: false, isLoggedIn: true, info: { id: action.payload.id, username: action.payload.username, lastLogin: action.payload.lastlogin }};
                return;        
                
            case ActionTypes.LOGIN_FAIL:
                draft.isLoading = false;
                return;
                
            case ActionTypes.LOGOUT_SUCCESS:
                draft = { ...draft, isLoading: false, isLoggedIn: false, info: { id: 0, username: '', lastLogin: 0 }}
        
            default:
                return;
        }
    });
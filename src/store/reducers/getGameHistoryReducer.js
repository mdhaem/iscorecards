import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    history: [],
    error: false
};

const fetchGameHistory = (state, action) => {
    console.log('STATE: ',state);
    console.log('ACTION.history: ', action.history);
    action.history.length === 0 ? action.history = null : null
    return updateObject( state, {
        history: action.history,
        error: false
    } );
};

const fetchGameHistoryFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_GAME_HISTORY: return fetchGameHistory(state, action);    
        case actionTypes.FETCH_GAME_HISTORY_FAILED: return fetchGameHistoryFailed(state, action);
        default: return state;
    }
};

export default reducer;
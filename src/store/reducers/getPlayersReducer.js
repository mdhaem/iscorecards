import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    playerList: [{firstName: '', fullName: '', lastName: '', user: ''}],
    error: false
};

const fetchPlayers = (state, action) => {
    console.log(action.playerList);
    if (action.playerList.length === 0) {action.playerList = null}
    return updateObject( state, {
        playerList: action.playerList,
        error: false
    } );
};

const fetchPlayersFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_PLAYERS: return fetchPlayers(state, action);    
        case actionTypes.FETCH_PLAYERS_FAILED: return fetchPlayersFailed(state, action);
        default: return state;
    }
};

export default reducer;
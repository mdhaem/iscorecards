import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    plist: [{firstName: "Mike", lastName: "DHaem", user: "IuTewWb2H8PN2RyBuX6DJp83jIx2"}],
    error: false
};

const fetchPlayers = (state, action) => {
    console.log(action.players);
    console.log(state);
    return updateObject( state, {
        plist: action.players,
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
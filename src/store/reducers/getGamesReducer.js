import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    games: [{game: '', hands: 0, user: ''}],
    error: false
};

const fetchGames = (state, action) => {
    // console.log('STATE: ',state);
    // console.log('ACTION.GAMES: ', action.games);
    if(action.games.length === 0) {action.games = null}
    return updateObject( state, {
        games: action.games,
        error: false
    } );
};

const fetchGamesFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_GAMES: return fetchGames(state, action);    
        case actionTypes.FETCH_GAMES_FAILED: return fetchGamesFailed(state, action);
        default: return state;
    }
};

export default reducer;
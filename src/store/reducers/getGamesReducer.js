import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    games: [{game: "Hand & Foot", hands: 8, user: "IuTewWb2H8PN2RyBuX6DJp83jIx2"}],
    error: false
};

const fetchGames = (state, action) => {
    console.log(action.games);
    console.log(state);
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
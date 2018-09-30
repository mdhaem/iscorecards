import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    
    game: '',
    players: []
};

const newScoreCard = ( state, action ) => {
    console.log(state);
    console.log(action.CardData.game, action.CardData.players, action);
    const returnValue = updateObject( state, {
        game: action.CardData.game,
        players: action.CardData.players
    } );
    console.log(returnValue)
    return returnValue;
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SELECTED_SCORECARD_GAME_TEAM: return newScoreCard( state, action );
        default: return state;
    }
};

export default reducer;
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    game: '',
    players: [],
    history: [],
    registered: true,
    loading: false,
    scoreAdded: false
};

const newScoreCard = ( state, action ) => {
    // console.log(state);
    // console.log(action.CardData);
    const returnValue = updateObject( state, {
        game: action.CardData.game,
        games: action.CardData.games,
        players: action.CardData.players,
        hands: action.CardData.hands,
        registered: action.CardData.registered,
        history: action.CardData.history,
    } );
    // console.log(returnValue)
    return returnValue;
};

const addGameResultInit = ( state, action ) => {
    return updateObject( state, { gameAdded: false } );
};

const addGameResultStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addGameResultSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        scoreAdded: true,
    } );
};

const addGameResultFail = ( state, action ) => {
    return updateObject( state, { loading: false, scoreAdded: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_GAME_RESULT_INIT: return addGameResultInit( state, action );
        case actionTypes.ADD_GAME_RESULT_START: return addGameResultStart( state, action );
        case actionTypes.ADD_GAME_RESULT_SUCCESS: return addGameResultSuccess( state, action )
        case actionTypes.ADD_GAME_RESULT_FAIL: return addGameResultFail( state, action );
        case actionTypes.SELECTED_SCORECARD_GAME_TEAM: return newScoreCard( state, action );
        default: return state;
    }
};

export default reducer;
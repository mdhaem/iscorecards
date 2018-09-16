import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    
    user: 'test',
    game: '',
    hands: 8,
    loading: false,
    gameAdded: false
};

const addGameInit = ( state, action ) => {
    return updateObject( state, { gameAdded: false } );
};

const addGameStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addGameSuccess = ( state, action ) => {
    return updateObject( state, {
        loading: false,
        gameAdded: true,
    } );
};

const addGameFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_GAME_INIT: return addGameInit( state, action );
        case actionTypes.ADD_GAME_START: return addGameStart( state, action );
        case actionTypes.ADD_GAME_SUCCESS: return addGameSuccess( state, action )
        case actionTypes.ADD_GAME_FAIL: return addGameFail( state, action );
        default: return state;
    }
};

export default reducer;
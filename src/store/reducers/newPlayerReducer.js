import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    
    user: '',
    firstName: '',
    lastName: '',
    loading: false,
    playerAdded: false
};

const addNewPlayerInit = ( state, action ) => {
    return updateObject( state, { playerAdded: false } );
};

const addNewPlayerStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addNewPlayerSuccess = ( state, action ) => {
    console.log(action);
    return updateObject( state, {
        user: action.user,
        firstName: action.firstName,
        lastName: action.lastName,
        loading: false,
        playerAdded: true,
    } );
};

const addNewPlayerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_NEW_PLAYER_INIT: return addNewPlayerInit( state, action );
        case actionTypes.ADD_NEW_PLAYER_START: return addNewPlayerStart( state, action );
        case actionTypes.ADD_NEW_PLAYER_SUCCESS: return addNewPlayerSuccess( state, action )
        case actionTypes.ADD_NEW_PLAYER_FAIL: return addNewPlayerFail( state, action );
        default: return state;
    }
};

export default reducer;
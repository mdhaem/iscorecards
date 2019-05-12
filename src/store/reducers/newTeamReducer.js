import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    
    user: '',
    team: [],
    loading: false,
    teamAdded: false
};

const addNewTeamInit = ( state, action ) => {
    return updateObject( state, { teamAdded: false } );
};

const addNewTeamStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const addNewTeamSuccess = ( state, action ) => {
    return updateObject( state, {
        user: action.user,
        team: action.team,
        loading: false,
        teamAdded: true,
    } );
};

const addNewTeamFail = ( state, action ) => {
    const newState = updateObject( state, { loading: false } );
console.log(newState);

    return newState;
};

const cancelNewTeam = (state) => {
    return updateObject(state, { teamAdded: false} );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_NEW_TEAM_INIT: return addNewTeamInit( state, action );
        case actionTypes.ADD_NEW_TEAM_START: return addNewTeamStart( state, action );
        case actionTypes.ADD_NEW_TEAM_SUCCESS: return addNewTeamSuccess( state, action )
        case actionTypes.ADD_NEW_TEAM_FAIL: return addNewTeamFail( state, action );
        case actionTypes.CANCEL_NEW_TEAM: return cancelNewTeam( state, action );
        default: return state;
    }
};

export default reducer;
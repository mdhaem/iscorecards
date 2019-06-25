import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';
// import { setNestedObjectValues } from 'formik';

const initialState = {
    teams: [{team: [], user: ''}],
    error: false,
};

const fetchTeams = (state, action) => {
    // console.log('STATE: ', state);
    // console.log('ACTION.TEAMS: ', action.teams);
    if( action.teams.length === 0 ) { action.teams = null }
    return updateObject( state, {
        teams: action.teams,
        error: false
    } );
};

const fetchTeamsFailed = (state, action) => {
    return updateObject( state, { error: true } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_TEAMS: return fetchTeams(state, action);    
        case actionTypes.FETCH_TEAMS_FAILED: return fetchTeamsFailed(state, action);
        default: return state;
    }
};

export default reducer;
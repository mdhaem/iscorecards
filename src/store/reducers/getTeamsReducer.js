import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../Shared/utility';

const initialState = {
    teams: [{team: [], user: "IuTewWb2H8PN2RyBuX6DJp83jIx2"}],
    error: false
};

const fetchTeams = (state, action) => {
    console.log(action.games);
    console.log(state);
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
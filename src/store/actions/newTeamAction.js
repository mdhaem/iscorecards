import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const addNewTeamSuccess = ( teamData ) => {
    return {
        type: actionTypes.ADD_NEW_TEAM_SUCCESS,
        teamData: teamData
    };
};

export const addNewTeamFail = ( error ) => {
    return {
        type: actionTypes.ADD_NEW_TEAM_FAIL,
        error: error
    };
}

export const addNewTeamStart = () => {
    return {
        type: actionTypes.ADD_NEW_TEAM_START
    };
};

export const cancelNewTeam = () => {
    return {
        type: actionTypes.CANCEL_NEW_TEAM,
        teamAdded: false
    };
};

export const addNewTeam = ( teamData ) => {
    return dispatch => {
        dispatch( addNewTeamStart() );
        axios.post( '/teams.json', teamData) //?auth=' + token, gameData )
            .then( response => {
                dispatch( addNewTeamSuccess( teamData ) );
            } )
            .catch( error => {
                dispatch( addNewTeamFail( error ) );

            } );
    };
};

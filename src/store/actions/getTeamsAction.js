import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchTeams = ( teams ) => {
    console.log(teams)
    return {
        type: actionTypes.FETCH_TEAMS,
        teams
    };
};

export const fetchTeamsFailed = () => {
    return {
        type: actionTypes.FETCH_TEAMS_FAILED
    };
};

export const initTeams = (tokenId) => {
    return dispatch => {
        axios.get( '/teams.json')
            .then( response => {
                console.log('response.data',response.data);
                const result = Object.keys(response.data).map(i => response.data[i])
                console.log(result);
               dispatch(fetchTeams(result));
            } )
            .catch( error => {
                dispatch(fetchTeamsFailed());
            } );
    };
};
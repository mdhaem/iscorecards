import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchTeams = ( teams ) => {
    // console.log('FETCH_TEAMS: ', teams)
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

export const initTeams = (tokenId, userId) => {
    return dispatch => {
        //const queryParams = '?orderBy="user"&equalTo="' + userId + '"';
        const queryParams = '?auth='+ tokenId + '&orderBy="user"&equalTo="' + userId + '"';

        axios.get( '/teams.json' + queryParams)
            .then( response => {
                // console.log('TEAM RESPONSE.DATA',response.data);
                const result = Object.keys(response.data).map(i => response.data[i])
                // console.log('TEAM RESULT: ', result);
               dispatch(fetchTeams(result));
            } )
            .catch( error => {
                dispatch(fetchTeamsFailed());
            } );
    };
};
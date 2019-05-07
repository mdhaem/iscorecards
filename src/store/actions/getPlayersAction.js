import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchPlayers = ( players ) => {
    console.log(players)
    return {
        type: actionTypes.FETCH_PLAYERS,
        playerList: players
    };
};

export const fetchPlayersFailed = () => {
    return {
        type: actionTypes.FETCH_PLAYERS_FAILED
    };
};

export const initPlayers = () => {
    return dispatch => {
        console.log(localStorage.getItem('userId'))
        const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + localStorage.getItem('userId') + '"';
        axios.get('/players.json' + queryParams)
            .then( response => {
                console.log('response.data',response.data);
                const result = Object.keys(response.data).map(i => response.data[i])
                console.log(result);
               dispatch(fetchPlayers(result));
            } )
            .catch( error => {
                dispatch(fetchPlayersFailed());
            } );
    };
};
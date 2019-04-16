import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchPlayers = ( players ) => {
    console.log(players)
    return {
        type: actionTypes.FETCH_PLAYERS,
        players: players
    };
};

export const fetchPlayersFailed = () => {
    return {
        type: actionTypes.FETCH_PLAYERS_FAILED
    };
};

export const initPlayers = () => {
    return dispatch => {
        axios.get( '/players.json' )
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
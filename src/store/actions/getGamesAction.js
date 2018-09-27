import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchGames = ( games ) => {
    console.log(games)
    return {
        type: actionTypes.FETCH_GAMES,
        games
    };
};

export const fetchGamesFailed = () => {
    return {
        type: actionTypes.FETCH_GAMES_FAILED
    };
};

export const initGames = (tokenId, userId) => {
    return dispatch => {
        const queryParams = '?auth='+ tokenId + '&orderBy="user"&equalTo="' + userId + '"';
        axios.get( '/games.json' + queryParams)
            .then( response => {
                console.log('response.data',response.data);
                const result = Object.keys(response.data).map(i => response.data[i])
                console.log(result);
               dispatch(fetchGames(result));
            } )
            .catch( error => {
                dispatch(fetchGamesFailed());
            } );
    };
};
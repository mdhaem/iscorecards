import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const fetchGameHistory = ( history ) => {
    console.log('FETCH_GAMEHISTORY: ', history)
    return {
        type: actionTypes.FETCH_GAME_HISTORY,
        history
    };
};

export const fetchGameHistoryFailed = () => {
    return {
        type: actionTypes.FETCH_GAME_HISTORY_FAILED
    };
};

export const initHistory = (tokenId, userId) => {
    return dispatch => {
        const queryParams = '?auth='+ tokenId + '&orderBy="user"&equalTo="' + userId + '"';
        axios.get( '/history.json' + queryParams)
            .then( response => {
                console.log('HISTORY RESPONSE.DATA: ',response.data);
                const result = Object.keys(response.data).map(i => response.data[i])
                console.log('HISTORY RESULT: ', result);
               dispatch(fetchGameHistory(result));
            } )
            .catch( error => {
                dispatch(fetchGameHistoryFailed());
            } );
    };
};
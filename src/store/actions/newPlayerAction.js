import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const addNewPlayerSuccess = ( playerData ) => {
    return {
        type: actionTypes.ADD_NEW_PLAYER_SUCCESS,
        playerData: playerData
    };
};

export const addNewPlayerFail = ( error ) => {
    return {
        type: actionTypes.ADD_NEW_PLAYER_FAIL,
        error: error
    };
}

export const addNewPlayerStart = () => {
    return {
        type: actionTypes.ADD_NEW_PLAYER_START
    };
};

export const addNewPlayer = ( playerData ) => {
    return dispatch => {
        dispatch( addNewPlayerStart() );
        axios.post( '/players.json', playerData) //?auth=' + token, gameData )
            .then( response => {
                dispatch( addNewPlayerSuccess( playerData ) );
            } )
            .catch( error => {
                dispatch( addNewPlayerFail( error ) );

            } );
    };
};
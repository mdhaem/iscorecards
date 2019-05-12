import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const addGameSuccess = ( gameData ) => {
    return {
        type: actionTypes.ADD_GAME_SUCCESS,
        gameData: gameData
    };
};

export const addGameFail = ( error ) => {
    return {
        type: actionTypes.ADD_GAME_FAIL,
        error: error
    };
}

export const addGameStart = () => {
    return {
        type: actionTypes.ADD_GAME_START
    };
};

export const addGame = ( gameData, token ) => {
    return dispatch => {
        dispatch( addGameStart() );
        axios.post( '/games.json', gameData) //?auth=' + token, gameData )
            .then( response => {
                dispatch( addGameSuccess( gameData ) );
            } )
            .catch( error => {
                dispatch( addGameFail( error ) );

            } );
    };
};
import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const newScoreCard = ( ScoreCard ) => {
    console.log(ScoreCard)
    return {
        type: actionTypes.SELECTED_SCORECARD_GAME_TEAM,
        CardData: ScoreCard
    };
};

export const makeScoreCard = ( ScoreCard ) => {
    console.log(ScoreCard)
    return dispatch => {
        dispatch( newScoreCard(ScoreCard) );
    };
};

export const addGameResultSuccess = ( gameData ) => {
    return {
        type: actionTypes.ADD_GAME_RESULT_SUCCESS,
        gameData: gameData
    };
};

export const addGameResultFail = ( error ) => {
    return {
        type: actionTypes.ADD_GAME_RESULT_FAIL,
        error: error
    };
}

export const addGameResultStart = () => {
    return {
        type: actionTypes.ADD_GAME_RESULT_START
    };
};

export const addGameResult = ( gameData, token ) => {
    return dispatch => {
        dispatch( addGameResultStart() );
        axios.post( '/history.json', gameData) //?auth=' + token, gameData )
            .then( response => {
                dispatch( addGameResultSuccess( gameData ) );
            } )
            .catch( error => {
                dispatch( addGameResultFail( error ) );

            } );
    };
};

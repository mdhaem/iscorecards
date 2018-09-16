import * as actionTypes from './actionTypes';
import axios from '../axios-data';

export const addScoreSuccess = ( scoreData ) => {
    return {
        type: actionTypes.ADD_SCORE_SUCCESS,
        //orderId: id,
        scoreData: scoreData
    };
};

export const addScoreFail = ( error ) => {
    return {
        type: actionTypes.ADD_SCORE_FAIL,
        error: error
    };
}

export const addScoreStart = () => {
    return {
        type: actionTypes.ADD_SCORE_START
    };
};

export const addScore = ( scoreData ) => {
    return dispatch => {
        dispatch( addScoreStart() );
        axios.post( '/history.json', scoreData )
            .then( response => {
                console.log( response.data );
                dispatch( addScoreSuccess( scoreData ) );
            } )
            .catch( error => {
                dispatch( addScoreFail( error ) );
            } );
    };
};
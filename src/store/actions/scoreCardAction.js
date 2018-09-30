import * as actionTypes from './actionTypes';

export const newScoreCard = ( ScoreCard ) => {
    return {
        type: actionTypes.SELECTED_SCORECARD_GAME_TEAM,
        CardData: ScoreCard
    };
};

export const makeScoreCard = ( ScoreCard ) => {
    return dispatch => {
        dispatch( newScoreCard(ScoreCard) );
    };
};

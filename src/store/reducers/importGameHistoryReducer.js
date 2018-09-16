import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    user: '',
    date: '',
    game: '',
    players: [
        {id: 1, player: 'Bill'}, 
        {id: 2, player: 'Bev'}, 
        {id: 3, player: 'Mike'}, 
        {id: 4, player: 'Sandy'}
    ],
    scores: [],
    loading: false,
    scoreAdded: false
};

const addScoreInit = ( state, action ) => {
    return updateObject( state, { scoreAdded: false } );
};

const addScoreStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const addScoreSuccess = ( state, action ) => {
    const newScore = updateObject( action.scoreData );
    return updateObject( state, {
        loading: false,
        scoreAdded: true,
        scores: state.scores.concat( newScore )
    } );
};

const addScoreFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_SCORE_INIT: return addScoreInit( state, action );
        case actionTypes.ADD_SCORE_START: return addScoreStart( state, action );
        case actionTypes.ADD_SCORE_SUCCESS: return addScoreSuccess( state, action )
        case actionTypes.ADD_SCORE_FAIL: return addScoreFail( state, action );
        default: return state;
    }
};

export default reducer;
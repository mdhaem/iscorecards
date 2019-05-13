import React, {Component} from  'react';
import {connect} from 'react-redux';
//import {Redirect} from 'react-router-dom';

import ScoreCardRow from './ScoreCardRow/ScoreCardRow';
import * as classes from './ScoreCard.css';


class scoreCard extends Component {
    render (props) {
        return (
            <div className={classes.ScoreCard}>
                <h1>{this.props.game}</h1>
                <ScoreCardRow />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        game: state.scoreCard.game,
     };
};

export default connect(mapStateToProps)(scoreCard);

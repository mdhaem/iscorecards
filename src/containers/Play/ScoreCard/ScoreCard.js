import React, {Component} from  'react';
import {connect} from 'react-redux';
//import {Redirect} from 'react-router-dom';

import ScoreCardRow from './ScoreCardRow/ScoreCardRow';
import * as classes from './ScoreCard.css';


class scoreCard extends Component {
    render (props) {
    //    console.log(this.props.idToken === undefined && this.props.game === ''); // console.log(this.props.game);
    //    console.log(localStorage.getItem('token'));
    //    console.log(!!localStorage.getItem('token'));
    //    console.log(this.props.game === ''); 
    //    console.log(!this.props.game);
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
    //     players: state.scoreCard.players,
    //     idToken: state.auth.idToken
     };
};

export default connect(mapStateToProps)(scoreCard);

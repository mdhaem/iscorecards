import React, { Component } from  'react';
import { connect } from 'react-redux';

//import Order from '../../components/Order/Order';
import axios from '../../../store/axios-data';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
//import Spinner from '../../../components/UI/Spinner/Spinner';
//import ScoreCardCell from '../../Play/ScoreCard/ScoreCell/ScoreCardCell';
import * as classes from './ImportGameHistory.css'
//import Button from '../../../components/UI/Button/Button';
//import Input from '../../../components/UI/Input/Input';
import DatePicker from '../../../components/UI/DatePicker/DatePicker';
import FormCode from './importGameHistoryForm';

class ImportGameHistory extends Component {

    times = n => f => {
        let iter = i => {
          if (i === n) return
          f (i)
          iter (i + 1)
        }
        return iter (0)
      };

    gameHistoryHandler = () => {
        alert('gameHistoryHandler called');
    };

    componentDidMount(props) {
        //const newState = this.state;
        this.props.onFetchGames(this.props.tokenId);
        this.props.onFetchTeams(this.props.tokenId);
        console.log(this.props.games);
        this.setState(this.state); 
      }

    render () {
        return (
            <div className={classes.ImportGameHistory}>
                <div><h1>Import Scores</h1></div>
                <DatePicker selected={this.props.date} onChange={this.handleChange} />
                <div><FormCode 
                        gameOptions={this.props.games} 
                        teamOptions={this.props.teams} 
                        players={this.props.players} 
                        submit={this.gameHistoryHandler} />
                </div>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.importScoresReducer.date,
        // game: state.importScoresReducer.game,
        players: state.importScoresReducer.players,
        // scores: state.importScoresReducer.scores,
        // loading: state.importScoresReducer.loading,
        // scoreAdded: state.importScoresReducer.scoreAdded,
        games: state.games.games,
        teams: state.teams.teams,
        tokenId: state.auth.tokenId
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.addScore() ),
        onFetchGames: () => dispatch( actions.initGames()),
        onFetchTeams: () => dispatch( actions.initTeams()),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ImportGameHistory, axios ) );
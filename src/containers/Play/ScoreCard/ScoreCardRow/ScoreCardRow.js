import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as moment from 'moment'

import * as classes from './ScoreCardRow.css';
import Button from '../../../../components/UI/Button/Button';
import * as actions from '../../../../store/actions';
import ScoreCardRows from '../ScoreCardRows/ScoreCardRows'
import ScoreCardPlayers from '../ScoreCardPlayers/ScoreCardPlayers'
import ScoreCardTotals from '../ScoreCardTotals/ScoreCardTotals'
import ScoreCardGameHistory from '../ScoreCardGameHistory/ScoreCardGameHistory'
import getHistory from '../../../../Shared/calculateGameHistory'

class ScoreCardRow extends Component {
    state = {
        game: this.props.game,
        games: this.props.games,
        history: this.props.history,
        historySummary: [],
        totals: [],
        sum: [],
        row: [],
        hands: this.props.hands,
        players: this.props.players,
        count: this.props.players.length,
        redirect: false,
        gameNumber: 1,
        message: '',
        saved: false
    }

    updateState = () => {
        this.setState(this.state); 
        const players = this.props.players;
        let newStateObjects = [];
        players.forEach(item => {
            newStateObjects.push({key: item, sum: 0,  value:[]});
        });
                
        return(newStateObjects); 
    }

    updateStateHistory = () => {
        // this.setState(this.state); 
        const players = this.props.players;
        let newStateObjects = [];
        players.forEach((item, index) => {
            newStateObjects.push({key: "history"+(index+1), value:0});
        });
                
        return(newStateObjects); 
    }

    inputChangedHandler = (event, inputIdentifier, column, row) => {
        
        const updatedRow = this.state.row;
        updatedRow.find(x => x.key === inputIdentifier).value = event.target.value;
        this.setState({row: updatedRow});

        const updatedState = this.state.totals;
        if(event.target.value >= 0){
            if(updatedState[column-1].value[row]){
                updatedState[column-1].value[row].value = event.target.value;
            } else {
                updatedState[column-1].value.push({key: inputIdentifier, value: event.target.value});
            }
        }
        const newSum = parseInt(this.sumArray(updatedState[column-1].value), 10);
        updatedState[column-1].sum = newSum;

        this.setState({totals: updatedState});
        this.setState(this.state);
    }

    newGameHandler = () => {
        const updatedRow = this.state.row;
        updatedRow.map( item => item.value = 0);
        this.setState({row: updatedRow});
        const updatedTotals = this.state.totals;
        updatedTotals.map( item => {
            item.sum = 0; 
            item.value = [];
            return updatedTotals;
        });
        this.setState({totals: updatedTotals, saved: false, message: ''});
    }

    quitHandler = () => {
        this.setState({redirect: true})
    }

    times = n => f => {
        let iter = i => {
          if (i === n) return
          f (i)
          iter (i + 1)
        }
        return iter (0)
      }
     
    sumArray = (stuff) => {
        let sum = 0;
        stuff.forEach(item => {
            if(item.value !== "") {
                sum += parseInt(item.value, 10);
            }
        });

        return parseInt(sum, 10);
    }
        
    
    componentDidMount() {
        if(this.props.hands){ this.setState({hands: parseInt(this.props.hands, 10)}, () => {
            const updateTotals = this.updateState();
            this.setState({totals: updateTotals});

            const rows = this.rowArray(this.state.count);
            this.setState({row: rows});

            const updateHistorySummary = this.updateStateHistory()
            console.log(updateHistorySummary)
            this.setState({historySummary: updateHistorySummary})

            const gameHistory = getHistory(this.state.history, this.state.game, this.state.players)
            console.log(gameHistory)
            const newGameHistory = this.state.historySummary
            this.setState({historySummary: newGameHistory})


        })}
    };

    rowArray(count) {
        let rowArray = [];
        this.times (this.state.hands) (r =>
        {
            this.times (count) (c =>  { 
                let id = 'row' + (r+1) + (c+1);
                rowArray.push( {key: id, value: 0});
            })
        
        })

        return rowArray;
    }

    handleFocus = (event) => {
        event.target.select();
    }
   
    addGameScoreHandler = (event) => {
        event.preventDefault();
        let gameObject = {}
        gameObject = this.state.games.find( gh => gh.game === this.state.game );

        console.log(this.state.sum)

        let winningScore = {}
        if (typeof(gameObject.winningHand) !== "undefined" && gameObject.winningHand === 'Low Score') {
            winningScore = this.state.totals.reduce((acc, cur) => acc = acc.sum*1 < cur.sum *1 ? acc : cur, 0)
            delete winningScore.value
        } else {
            winningScore = this.state.totals.reduce((acc, cur) => acc = acc.sum*1 > cur.sum*1 ? acc : cur, 0)
            delete winningScore.value
        }

        const  gameFinalScore = {
            user: localStorage.getItem('userId'),
            scoresDate: moment(this.state.selectedDate).format('MM-DD-YYYY'),
            game: this.state.game,
            team: this.state.players,
            scores: this.state.totals,
            winner: winningScore,
            gameNumber: this.state.gameNumber,
        }
        this.props.onAddGameResult(gameFinalScore);
        this.setState(this.state); 
        this.setState({redirect: true}); 
    }

    addRowHandler = ( event ) => {
        event.preventDefault();
        let newHands = this.state.hands ;
        let newRowArray = this.state.row;
        this.times (this.props.players.length) (c =>  { 
            let id = 'row' + (this.state.hands+1) + (c+1);
            newRowArray.push( {key: id, value: 0});
        })
        this.setState({row: newRowArray, hands: newHands + 1 });
        
    }

    deleteRowHandler = ( event ) => {
        event.preventDefault();
        let newHands = this.state.hands ;
        let newRowArray = this.state.row;
        const newTotalsArray = this.state.totals;
        newRowArray.splice(newRowArray.length - this.props.players.length, this.props.players.length);
        this.setState({hands: newHands - 1, row: newRowArray, totals: newTotalsArray });        
    }

    ////////////////////////////////////////////////////////
    render (props) {
        // const gameHistory = getHistory(this.state.history, this.state.game, this.state.players)
        console.log(this.state.historySummary)
        return (
            <React.Fragment>
            {this.state.message ? <p>{this.state.message}</p> : null}
            <div className={classes.ScoreCard}>
                {this.state.redirect?<Redirect to="/home" />:null}
                {this.props.registered ?
                <div className={classes.ScoreCardRows}>
                    <ScoreCardGameHistory
                        count={this.state.count}
                        times={this.times}
                        history={this.state.historySummary}>
                    </ScoreCardGameHistory>
                </div>
                : null}
                {this.state.totals.length ?
                <div className={classes.ScoreCardRows}>
                    <ScoreCardTotals 
                        count={this.state.count}
                        totals={this.state.totals} 
                        times={this.times}>
                    </ScoreCardTotals>
                </div>
                : null}
                <div className={classes.ScoreCardRows}>
                    <ScoreCardPlayers 
                        players={this.state.players}>
                    </ScoreCardPlayers>
                </div>
                {this.state.totals.length ?
                <div className={classes.ScoreCardRows}>
                    <ScoreCardRows 
                        hands={this.state.hands} 
                        count={this.state.count} 
                        row={this.state.row}
                        players={this.state.players}
                        inputChangedHandler={this.inputChangedHandler}
                        times={this.times}>
                    </ScoreCardRows>
                </div>
                : null}
                <div className={classes.ScoreCardControls}>
                    <Button className={classes.Button} btnType='Action' clicked={this.addRowHandler}>ADD ROW</Button>
                    <Button btnType='Action' clicked={this.deleteRowHandler}>DELETE ROW</Button>
                </div>
                <div className={classes.ScoreCardControls}>
                    <Button btnType='Success' clicked={this.newGameHandler}>NEW GAME</Button>
                    {this.props.registered ? <Button btnType='Save' disabled={this.state.saved} clicked={this.addGameScoreHandler}>Save</Button> : null}
                    <Button btnType='Danger' clicked={this.quitHandler}>QUIT</Button>
                </div>
            </div>
            </React.Fragment>
        )  
    }
}

const mapStateToProps = state => {
    return {
            players: state.scoreCard.players,
            game: state.scoreCard.game,
            games: state.scoreCard.games,
            history: state.history.history,
            hands: state.scoreCard.hands,
            registered: state.scoreCard.registered,
            token: state.auth.idToken,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddGameResult: (scoreCard) => dispatch(actions.addGameResult(scoreCard)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCardRow);    
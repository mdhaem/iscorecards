import React, { Component } from  'react';
import { connect } from 'react-redux';

//import Order from '../../components/Order/Order';
import axios from '../../../store/axios-data';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';
//import Spinner from '../../../components/UI/Spinner/Spinner';
import ScoreCardCell from '../../Play/ScoreCard/ScoreCell/ScoreCardCell';
import * as classes from './ImportGameHistory.css'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import DatePicker from '../../../components/UI/DatePicker/DatePicker';

class ImportGameHistory extends Component {
    state = {
        selectGameForm: {
            
            games: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a game', displayValue: '...chose a game'},
                        {value: 'Hand and Foot', displayValue: 'Hand and Foot'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false,
            },
            teams: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a team', displayValue: '...chose a team'},
                        {value: 'Mike, Sandy', displayValue: 'Mike, Sandy'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false
            }
        },
        formIsValid: false
    }

    times = n => f => {
        let iter = i => {
          if (i === n) return
          f (i)
          iter (i + 1)
        }
        return iter (0)
      }
    state = {
        selectGameForm: {
            
            games: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a game', displayValue: '...chose a game'},
                        {value: 'Hand and Foot', displayValue: 'Hand and Foot'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false,
            },
            teams: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: '...chose a team', displayValue: '...chose a team'},
                        {value: 'Mike, Sandy', displayValue: 'Mike, Sandy'}
                    ]
                },
                value: 8,
                validation: {
                    changed: true
                },
                valid: false
            }
        },
        formIsValid: false
    }
    render () {
        const formElementsArray = [];
        for (let key in this.state.selectGameForm) {
            formElementsArray.push({
                id: key,
                config: this.state.selectGameForm[key]
            });
        }
        
        //let history = <Spinner />;
        //if ( this.props.loading ) {
            let gameHistory = [];
            gameHistory.push(
                <ScoreCardCell 
                        key={'history'}
                        id={'history'}
                        type='text'
                        defaultValue='History'
                        />)
            this.times (4) (i => {
                let id = 'history'+(i+1); 
                gameHistory.push(
                <ScoreCardCell 
                        key={id}
                        id={id}
                        type='text'
                        defaultValue='0'
                        />)
            })

            let gamePlayers = [];
            gamePlayers.push(
            <ScoreCardCell 
                    key={'player'}
                    id={'player'}
                    type='text'
                    defaultValue='Player'
                    changed={(event) => {}}/>)
console.log(this.props);
            const players = this.props.players;
            players.map( player => (               
                gamePlayers.push(
                    <ScoreCardCell 
                            key={player.player}
                            id={player.player}
                            type='text'
                            defaultValue={player.player}
                            />)));
                            let form = (
                                <form onSubmit={this.orderHandler}>
                                    {formElementsArray.map(formElement => (
                                        <Input 
                                            key={formElement.id}
                                            elementType={formElement.config.elementType}
                                            elementConfig={formElement.config.elementConfig}
                                            value={formElement.config.value}
                                            invalid={!formElement.config.valid}
                                            shouldValidate={formElement.config.validation}
                                            touched={formElement.config.touched}
                                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                                    ))}
                                    <div className={classes.ImportGameHistoryRows}>{gamePlayers}</div>
                                    <div className={classes.ImportGameHistoryRows}>{gameHistory}</div>
                                    <div className={classes.ImportGameHistoryControls}></div>
                                    <Button btnType="Danger">CANCEL</Button>
                                    <Button btnType="Success" disabled={!this.state.formIsValid}>SAVE</Button>
                                </form>
                            );
        return (
            <div className={classes.ImportGameHistory}>
                <div><h1>Import Scores</h1></div>
                    <DatePicker selected={this.state.date} onChange={this.handleChange} />
                    <div>{form}</div>
                </div>
                
        );
    }
}

const mapStateToProps = state => {
    return {
        date: state.importScoresReducer.date,
        game: state.importScoresReducer.game,
        players: state.importScoresReducer.players,
        scores: state.importScoresReducer.scores,
        loading: state.importScoresReducer.loading,
        scoreAdded: state.importScoresReducer.scoreAdded,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.addScore() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( ImportGameHistory, axios ) );
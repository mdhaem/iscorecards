import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as classes from './ScoreCardRow.css';
import ScoreCardCell from '../ScoreCell/ScoreCardCell';
import Button from '../../../../components/UI/Button/Button';
//import Aux from '../../../../hoc/Aux/Aux';

class ScoreCardRow extends Component {
    state = {
        totals: [],
        row: [],
        hands: 9,
        redirect: false
    }

    updateState = () => {
        this.setState(this.state); 
        const players = this.props.players;
        console.log(this.props.players);
        let newStateObjects = [];
        players.forEach(item => {
            newStateObjects.push({key: item, sum: 0,  value:[]});
        });
        
        //console.log(newStateObjects);
        
        return(newStateObjects); 
    }

    inputChangedHandler = (event, inputIdentifier, column, row) => {
        console.log('#######################################');
        console.log('event.target.value', event.target.value);
        console.log('inputIdentifier', inputIdentifier);
        console.log('column', column);
        console.log('row', row);

        const updatedRow = this.state.row;
        updatedRow.find(x => x.key === inputIdentifier).value = event.target.value;
        this.setState({row: updatedRow});

        const updatedState = this.state.totals;
        console.log('updatedState[column-1].value[row]', updatedState[column-1].value[row]);
        if(event.target.value >= 0){
            //console.log(updatedState[column-1].value[row]);
            if(updatedState[column-1].value[row]){
                updatedState[column-1].value[row].value = event.target.value;
            } else {
                updatedState[column-1].value.push({value: event.target.value});
                console.log(updatedState[column-1].value[row]);
            }
        }
        console.log('updatedState', updatedState);
        console.log('updatedState[column-1].value', updatedState[column-1].value);
        const newSum = parseInt(this.sumArray(updatedState[column-1].value), 10);
        console.log('newSum', newSum);
        updatedState[column-1].sum = newSum;
        this.setState({totals: updatedState});
        console.log('this.state.totals',this.state.totals);
        console.log('this.state.totals[column-1].sum', this.state.totals[column-1].sum);
        this.setState(this.state);
    }

    newGameHandler = () => {
        const updatedRow = this.state.row;
        updatedRow.map( item => item.value = 0);
        this.setState({row: updatedRow});
        const updatedTotals = this.state.totals;
        console.log(updatedTotals);
        updatedTotals.map( item => {
            item.sum = 0; 
            item.value = [];
            return updatedTotals;
        });
        this.setState({totals: updatedTotals});
        console.log(updatedTotals);
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
        console.log(stuff);
        let sum = 0;
        stuff.forEach(item => {
            if(item.value !== "") {
                sum += parseInt(item.value, 10);
            }
        });

        return parseInt(sum, 10);
    }
        
    
    componentWillMount() {
        //populate state totals with {key:name sum:0} for each player
        const updateTotals = this.updateState();
        this.setState({totals: updateTotals});

        //populate state row with {key:}
        const rows = this.rowArray(this.props.players.length);
        //console.log(rows);
        let newRows = this.state.row;
        newRows = rows;
        this.setState({row: newRows});
        //console.log(this.state.row);
    };

    rowArray() {
        const count = this.props.players.length;
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

    addGameScoreHandler = ( event ) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.newGameForm) {
            formData[formElementIdentifier] = this.state.newGameForm[formElementIdentifier].value;
        }
        const newGame = {
            user: this.props.user,
            game: this.state.newGameForm.name.value,
            hands: this.state.newGameForm.hands.value
        }
        
        this.props.onAddGameResult(newGame, this.props.token);  
    }

    ////////////////////////////////////////////////////////
    render (props) {
        
        const count = this.props.players.length;

        let gameHistory = [];
        gameHistory.push(
            <ScoreCardCell 
                    key={'history'}
                    id={'history'}
                    type='text'
                    defaultValue='History'
                    />)
        this.times (count) (i => {
            let id = 'history'+(i+1); 
            gameHistory.push(
            <ScoreCardCell 
                    key={id}
                    id={id}
                    type='text'
                    defaultValue='0'
                    />)
        })

       let totals = [];
        totals.push(
            <ScoreCardCell 
                    key={'totals'}
                    id={'totals'}
                    type='text'
                    defaultValue='Score'
                    />)
        this.times (count) (i => {
            let id = 'totals'+(i+1); 
            totals.push(
            <ScoreCardCell 
                    key={id}
                    id={id}
                    type='text'
                    value={parseInt(this.state.totals[i].sum, 10)}
                    changed={(event) => {}}/>)
            })

            let gamePlayers = [];
            gamePlayers.push(
            <ScoreCardCell 
                    key={'player'}
                    id={'player'}
                    type='text'
                    defaultValue='Player'
                    changed={(event) => {}}/>)

            const players = this.props.players;
            //console.log(players);
            players.map( player => (               
                gamePlayers.push(
                    <ScoreCardCell 
                            key={player}
                            id={player}
                            type='text'
                            defaultValue={player}
                            />)));

            let row = [];
            this.times (8) (r =>
            {
                let id = 'hand'+(r+1);
                row.push(
                    <ScoreCardCell 
                            key={id}
                            id={id}
                            type='text'
                            defaultValue={r+1}
                            />)
                
                    this.times (count) (c =>  { 
                        let id = 'row' + (r+1) + (c+1);
                        row.push(
                        <ScoreCardCell 
                                key={id}
                                id={id}
                                column={c}
                                type='number'
                                value={this.state.row.find(x => x.key === id).value}//{this.state.value}
                                changed={(event) => this.inputChangedHandler(event, id, (c+1), r)}
                                />)
                    })                         
            });
            
                let frow = [];
                let irowKey = 0;
                while (row.length) {
                    let irow = row.splice(0, this.props.players.length + 1)
                    irowKey++;
                    frow.push(<div key={'irow'+irowKey}>{irow}</div>);
                }

        return (
            
            <div className={classes.ScoreCard}>
            {/* <form onSubmit={this.addGameScoreHandler}> */}
                {this.state.redirect?<Redirect to="/home" />:null}
                {this.props.registered ?
                <div className={classes.ScoreCardRows}>{gameHistory}</div>
                : null}
                <div className={classes.ScoreCardRows}>{totals}</div>
                <div className={classes.ScoreCardRows}>{gamePlayers}</div>
                <div className={classes.ScoreCardRows}>{frow}</div>
                <div className={classes.ScoreCardControls}>
                    <Button className={classes.Button} btnType='Action'>ADD ROW</Button>
                    <Button btnType='Action'>DELETE ROW</Button>
                </div>
                <div className={classes.ScoreCardControls}>
                    <Button btnType='Success' clicked={this.newGameHandler}>NEW GAME</Button>
                    {this.props.registered ? <Button btnType='Save'  clicked={this.addGameScoreHandler}>Save</Button> : null}
                    <Button btnType='Danger' clicked={this.quitHandler}>QUIT</Button>
                </div>
            {/* </form>
            <Button btnType='Success' clicked={this.newGameHandler}>NEW GAME</Button> */}
            </div>
        );
        
    }

}

const mapStateToProps = state => {
    return {
            players: state.scoreCard.players,
            game: state.scoreCard.game,
            registered: state.scoreCard.registered,
            token: state.auth.idToken,
    };
};

export default connect(mapStateToProps, null)(ScoreCardRow);    
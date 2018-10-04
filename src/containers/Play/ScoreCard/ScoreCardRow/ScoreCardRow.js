import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as classes from './ScoreCardRow.css';
import ScoreCardCell from '../ScoreCell/ScoreCardCell';
import Button from '../../../../components/UI/Button/Button';
//import Aux from '../../../../hoc/Aux/Aux';

class ScoreCardRow extends Component {
    state = {
        totals: [],
        row: []
    }

    updateState = () => {
        this.setState(this.state); 
        const players = this.props.players;
        console.log(this.props.players);
        let newStateObjects = [];
        players.forEach(item => {
            newStateObjects.push({key: 'totals'+item.id, sum: 0,  value:[]});
        });
        
        console.log(newStateObjects);
        
        return(newStateObjects); 
    }

    inputChangedHandler = (event, inputIdentifier, column, row) => {
        //alert('scorecardrow inputChangeHandle called');
        console.log(event.target.value);
        console.log(inputIdentifier);
        console.log(column);
        console.log(row);

        const updatedRow = this.state.row;
        updatedRow.find(x => x.key === inputIdentifier).value = event.target.value;
        this.setState({row: updatedRow});

        const updatedState = this.state.totals;
        console.log(updatedState[column-1].value[row]);
        if(event.target.value >= 0){
            console.log(updatedState[column-1].value[row]);
            if(updatedState[column-1].value[row]){
                updatedState[column-1].value[row].value = event.target.value;
            } else {
                updatedState[column-1].value.push({value: event.target.value});
                console.log(updatedState[column-1].value[row]);
            }
        }
        console.log(updatedState);
        console.log(updatedState[column-1].value);
        const newSum = parseInt(this.sumArray(updatedState[column-1].value), 10);
        console.log(newSum);
        updatedState[column-1].sum = newSum;
        this.setState({totals: updatedState});
        console.log(this.state.totals);
        console.log(this.state.totals[0].sum);
        this.setState(this.state);
    }

    newGameHandler = () => {
        const updatedRow = this.state.row;
        updatedRow.map( value => value = 0);
        this.setState({row: updatedRow});
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
        const updateTotals = this.updateState();
        //console.log(updateTotals);
        this.setState({totals: updateTotals});
        // console.log(this.props.players.length);
        const rows = this.rowArray(this.props.players.length);
        console.log(rows);
        let newRows = this.state.row;
        newRows = rows;
        this.setState({row: newRows});
        console.log(this.state.row);
    };

    // componentDidMount() {
    //     console.log(this.props.players.length);
    //     const rows = this.rowArray(this.props.players.length);
    //     console.log(rows);
    //     let newRows = this.state.row;
    //     newRows = rows;
    //     this.setState({row: newRows});
    //     console.log(this.state.row);
        
    // }

    rowArray() {
        const count = this.props.players.length;
        let rowArray = [];
        this.times (8) (r =>
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

    rows(count) {
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
                            value={this.state.row.find(x => x.key === id).value}//{this.state.value}//
                            changed={(event) => this.inputChangedHandler(event, id, (c+1), r)}
                            focus={this.handleFocus}
                                />)
                    })
                        
            });
            return row;
    }
    ////////////////////////////////////////////////////////
    render (props) {
        
        const count = this.props.players.length;
        console.log(count);
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
console.log(totals);
            let gamePlayers = [];
            gamePlayers.push(
            <ScoreCardCell 
                    key={'player'}
                    id={'player'}
                    type='text'
                    defaultValue='Player'
                    changed={(event) => {}}/>)

            const players = this.props.players;
            console.log(players);
            players.map( player => (               
                gamePlayers.push(
                    <ScoreCardCell 
                            key={player}
                            id={player}
                            type='text'
                            defaultValue={player}
                            />)));

            // let row = [];
            // this.times (8) (r =>
            //     {
            //         let id = 'hand'+(r+1);
            //         row.push(
            //             <ScoreCardCell 
            //                     key={id}
            //                     id={id}
            //                     type='text'
            //                     defaultValue={r+1}
            //                     />)
                    
            //             this.times (count) (c =>  { 
            //                 let id = 'row' + (r+1) + (c+1);
            //             row.push(
            //            <ScoreCardCell 
            //                     key={id}
            //                     id={id}
            //                     column={c}
            //                     type='number'
            //                     value={this.state.value}
            //                     changed={(event) => this.inputChangedHandler(event, id, (c+1), r)}
            //                      />)
            //             })
                            
            //     });
            //console.log(this.state.row.find(x => x.key === 'row11').value);
                console.log(this.state.row);
                const row = (this.rows(count));
                console.log(count);
                let frow = [];
                let irowKey = 0;
                while (row.length) {
                    let irow = row.splice(0, this.props.players.length + 1)
                    console.log(irow);
                    irowKey++;
                    frow.push(<div key={'irow'+irowKey}>{irow}</div>);
                }
                console.log(frow);

        return (
            
            <div className={classes.ScoreCard}>
                
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
                    {this.props.registered ? <Button btnType='Save'>Save</Button> : null}
                    <Button btnType='Danger'>QUIT</Button>
                </div>
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
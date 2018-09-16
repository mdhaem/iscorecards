import React, {Component} from 'react';
// import { Route, Redirect } from 'react-router-dom';


import * as classes from './ScoreCardRow.css';
import ScoreCardCell from '../ScoreCell/ScoreCardCell';
import Button from '../../../../components/UI/Button/Button';

class ScoreCardRow extends Component {
    state = {
        game: 'Hand and Foot',
        players: [
            {id: 1, player: 'Bill'}, 
            {id: 2, player: 'Bev'}, 
            {id: 3, player: 'Mike'}, 
            {id: 4, player: 'Sandy'}
        ],
        scores: [],
        totals: []
    }

    updateState = () => {
        const players = this.state.players;
        console.log(players);
        let newStateObjects = [];
        players.forEach(item => {
            newStateObjects.push({key: 'totals'+item.id, sum: 0,  value:[]});
        });
        
        console.log(newStateObjects);
        
        return(newStateObjects); 
    }

    inputChangedHandler = (event, inputIdentifier, column, row) => {
        console.log(event.target.value);
        console.log(inputIdentifier);
        console.log(column);
        console.log(row);

        const updatedState = this.state.totals;
        console.log(updatedState[column-1].value);
        if(event.target.value !== ""){
            console.log(updatedState[column-1].value[row]);
            if(updatedState[column-1].value[row]){
                updatedState[column-1].value[row].value = event.target.value;
            } else {
                updatedState[column-1].value.push({value: event.target.value});
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
    }

    newGameHandler = () => {
        window.location.reload();
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
    };

    render (props) {

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

       let totals = [];
        totals.push(
            <ScoreCardCell 
                    key={'totals'}
                    id={'totals'}
                    type='text'
                    defaultValue='Score'
                    />)
        this.times (4) (i => {
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

            const players = this.state.players;
            players.map( player => (               
                gamePlayers.push(
                    <ScoreCardCell 
                            key={player.player}
                            id={player.player}
                            type='text'
                            defaultValue={player.player}
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
                    
                        //for (let c = 1; c <= 4; c++) {
                        this.times (4) (c =>  { 
                            let id = 'row' + (r+1) + (c+1);
                        row.push(
                        <ScoreCardCell 
                                key={id}
                                id={id}
                                column={c}
                                type='number'
                                value={this.state.value}
                                changed={(event) => this.inputChangedHandler(event, id, (c+1), r)} />)
                        })
                            
                });

        return (
            <div className={classes.ScoreCard}>
                <div><h1>{this.state.game}</h1></div>
                <div className={classes.ScoreCardRows}>{gameHistory}</div>
                <div className={classes.ScoreCardRows}>{totals}</div>
                <div className={classes.ScoreCardRows}>{gamePlayers}</div>
                <div className={classes.ScoreCardRows}>{row}</div>
                <div className={classes.ScoreCardControls}>
                    <Button className={classes.Button} btnType='Action'>ADD ROW</Button>
                    <Button btnType='Action'>DELETE ROW</Button>
                </div>
                <div className={classes.ScoreCardControls}>
                    <Button btnType='Success' clicked={this.newGameHandler}>NEW GAME</Button>
                    <Button btnType='Save'>Save</Button>
                    <Button btnType='Danger'>QUIT</Button>
                </div>
            </div>
        );
        
    }

}

export default ScoreCardRow    
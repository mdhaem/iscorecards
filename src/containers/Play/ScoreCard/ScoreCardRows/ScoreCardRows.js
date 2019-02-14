import React from 'react'

import ScoreCardCell from '../ScoreCell/ScoreCardCell';


const scoreCardRows = props => {
    let row = [];
    let count = props.count*1
    let hands = props.hands*1

    props.times (hands) (r =>
    {
        let id = 'hand'+(r+1);
        row.push(
            <ScoreCardCell 
                    key={id}
                    id={id}
                    type='text'
                    defaultValue={r+1}
                    />)
        
            props.times (count) (c =>  { 
                let id = 'row' + (r+1) + (c+1);
                row.push(
                <ScoreCardCell 
                        key={id}
                        id={id}
                        column={c}
                        type='number'
                        value={props.row.find(x => x.key === id).value}//{this.state.value}
                        changed={(event) => props.inputChangedHandler(event, id, (c+1), r)}
                        />)
            })                         
    });

    let frow = [];
    let irowKey = 0;
    while (row.length) {
        let irow = row.splice(0, props.players.length + 1)
        irowKey++;
        frow.push(<div key={'irow'+irowKey}>{irow}</div>);
    }

    return frow
}

export default scoreCardRows
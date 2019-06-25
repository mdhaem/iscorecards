import React from 'react'

import ScoreCardCell from '../../../Play/ScoreCard/ScoreCell/ScoreCardCell';
import {times} from '../../../../Shared/utility'

const scoreCardRows = props => {
    // console.log(props, 'SCORECARDROWS PROPS')
    let row = [];
    // let count = props.count*1
    // let hands = props.hands*1
    let team = props.team

    times (team.length) (r =>
    {
        let teamMemberId = 'teamMember'+(r+1);
        row.push(
            <ScoreCardCell 
                    key={teamMemberId}
                    id={teamMemberId}
                    type='text'
                    defaultValue={team[r]}
                    />)
        
            let teamMemberScoreId = 'row' + (r+1)
            row.push(
            <ScoreCardCell 
                    key={teamMemberScoreId}
                    id={teamMemberScoreId}
                    // column={c}
                    type='number'
                    value={props.score}
                    changed={props.changed}
                    blur={props.blur}
                    />)
            })                         
// console.log(row)
// console.log(row.length)
    let frow = [];
    let irowKey = 0;
    while (row.length) {
        let irow = row.splice(0, 2)
        // console.log(irow)
        if(irow.length < 1) break 
        irowKey++;
        // console.log(irow)
        frow.push(<div key={'irow'+irowKey}>{irow}</div>);
    }
// console.log(frow)
    return frow
}

export default scoreCardRows
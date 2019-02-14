import React from 'react'

import ScoreCardCell from '../ScoreCell/ScoreCardCell'

//Requires count and totals[]
const scoreCardTotals = props => {
    let totals = []
    let count = props.count*1
    totals.push(
        <ScoreCardCell 
            key={'totals'}
            id={'totals'}
            type='text'
            defaultValue='Score'
            />)
        props.times (count) (i => {
            let id = 'totals'+(i+1); 
            totals.push(
            <ScoreCardCell 
                    key={id}
                    id={id}
                    type='text'
                    value={parseInt(props.totals[i].sum, 10)}
                    changed={(event) => {}}/>)
            })
    return totals
}

export default scoreCardTotals
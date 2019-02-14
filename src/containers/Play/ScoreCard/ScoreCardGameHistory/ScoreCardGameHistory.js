import React from 'react'

import ScoreCardCell from '../ScoreCell/ScoreCardCell'
    
const scoreCardGameHistory = props => {
    let count = props.count*1
    let gameHistory = [];
    
    gameHistory.push(
        <ScoreCardCell 
                key={'history'}
                id={'history'}
                type='text'
                defaultValue='History'
                />)
    props.times (count) (i => {
        let id = 'history'+(i+1); 
        gameHistory.push(
        <ScoreCardCell 
                key={id}
                id={id}
                type='text'
                defaultValue='0'
                />)
    })

    return gameHistory
}

export default scoreCardGameHistory
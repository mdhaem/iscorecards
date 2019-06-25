import React from 'react'
import ScoreCardCell from '../ScoreCell/ScoreCardCell'
    
const scoreCardGameHistory = props => {
    let count = props.count*1
    let history = []
    console.log(props.history)
    history.push(
        <ScoreCardCell 
                key={'history'}
                id={'history'}
                type='text'
                defaultValue='History'
                />)
    props.times (count) (i => {
        let id = 'history'+(i+1); 
        history.push(
        <ScoreCardCell 
                key={id}
                id={id}
                type='text'
                defaultValue='0'
                />)
    })

    return history
}

export default scoreCardGameHistory
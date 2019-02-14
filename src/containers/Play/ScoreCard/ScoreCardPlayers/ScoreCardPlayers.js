import React from 'react'

import ScoreCardCell from '../ScoreCell/ScoreCardCell'

const scoreCardPlayers = props => {
    
    let gamePlayers = [];

    gamePlayers.push(
        <ScoreCardCell 
            key={'player'}
            id={'player'}
            type='text'
            defaultValue='Player'
            changed={(event) => {}}/>
    )

    const players = props.players;
        players.map( player => (               
            gamePlayers.push(
                <ScoreCardCell 
                    key={player}
                    id={player}
                    type='text'
                    defaultValue={player}/>
            )
        ))
          
    return gamePlayers
}

export default scoreCardPlayers
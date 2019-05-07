export const optionsAvailable= (options, referrer, optionType, props) => {
    let noOptions = false
    options === null && noOptions === false ? noOptions = true : noOptions = false

    // typeof referrer !=='undefined' ? console.log(Object.keys(referrer)[0]):null
    // typeof referrer !=='undefined' ? console.log(Object.values(referrer)[0]):null
    
    if(typeof referrer !=='undefined' &&
    Object.values(referrer)[0] &&
    // Object.keys(referrer)[0] === optionType &&
    options === null) {
      switch(Object.keys(referrer)[0]) {
        case 'returnGameToPlay':
          props.onFetchGames(props.tokenId, props.userId)
          break
        case 'returnTeamToPlay':
          console.log(this.props)
          props.onFetchTeams(props.tokenId, props.userId)
          break
        case 'returnNewTeam':
          props.onFetchPlayers(props.tokenId, props.userId)
          break
        default:
          console.log('Option type not recognized')
      }
    }

    //Reset noOptions  
    if(typeof referrer !== 'undefined' && 
    Object.values(referrer)[0] &&
    Object.keys(referrer)[0] === optionType)  {
      noOptions = false 
    }

  return noOptions
}
import axios from '../store/axios-data';


export const saveGameTotals = ( gameFinalScore ) => {
    // const gameFinalScore = {
    //     user: localStorage.getItem('userId'),
    //     scoresDate: moment().format('MM-DD-YYYY'),
    //     game: props.game,
    //     team: props.players,
    //     scores: props.totals,
    //     gameNumber: props.gameNumber,
    // }
    let message = {}
    //get all games for user
    //https://scorecards-482b8.firebaseio.com/history.json
    const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + gameFinalScore.user + '"';
    axios.get( '/history.json' + queryParams).then( response => {
        console.log(response)
        const result = Object.keys(response.data).map(i => response.data[i])
        console.log(result)
        //if game exists set exists to true
        const findResult = result.find(item => item.game === gameFinalScore.game 
            && item.scoresDate === gameFinalScore.scoresDate
            && item.team === gameFinalScore.team)

        const exists = gameExists(gameFinalScore, result)
        
        if(exists.length){
            gameFinalScore.gameNumber = gameFinalScore.gameNumber + 1
        } 
        axios.post( '/history.json', gameFinalScore) //?auth=' + token, gameData )
        .then( response => {
            message = {gameName: gameFinalScore.game + ' played on '+ gameFinalScore.scoresDate + ' was added'}
        } )
        .catch( error => {
            message = {gameName: gameFinalScore.game + ' played on '+ gameFinalScore.scoresDate + ' was NOT added'}
        } )
    } )
    .catch( error => {
        message = {gameName: gameFinalScore.game + ' error while checking if game exists'}
        console.log( 'ERROR', error ) 
    } )

    return message
}

const gameExists = (gameFinalScore, result) => {
    const filter = {
        game: gameFinalScore.game,
        scoresDate: gameFinalScore.scoresDate,
        //team: gameFinalScore.team
    }

    const exists = result.filter((item) => {
        for (var key in filter) {
            console.log(item[key])
            console.log(filter[key])
            if (item[key] === undefined || item[key] !== filter[key]){
                return false;
            }
        }
        return true;
    })

    return exists
}

import axios from '../store/axios-data';


export const saveGameTotals = ( gameFinalScore ) => {
    //get all games for user
    //https://scorecards-482b8.firebaseio.com/history.json
    const queryParams = '?auth='+ localStorage.getItem('token') + '&orderBy="user"&equalTo="' + gameFinalScore.user + '"';
    return axios.get( '/history.json' + queryParams).then( response => {
        // console.log(response)
        const result = Object.keys(response.data).map(i => response.data[i])
        const exists = gameExists(gameFinalScore, result)
        const maxgame = Math.max.apply(Math, exists.map((o) => { return o.gameNumber; }))
        if(exists.length){
            gameFinalScore.gameNumber += maxgame
        } 
        return axios.post( '/history.json', gameFinalScore) //?auth=' + token, gameData )
        .then( response => { 
            // console.log( 'SUCCESS', gameFinalScore.game + ' played on '+ gameFinalScore.scoresDate + ' was added' ) 
            return gameFinalScore.game + ' played on '+ gameFinalScore.scoresDate + ' was added'
        } )
        .catch( error => {
            console.log( 'ERROR', error )
            return gameFinalScore.game + ' played on '+ gameFinalScore.scoresDate + ' was NOT added'
        } )
    } )
    .catch( error => {
        console.log( 'ERROR', error ) 
        return gameFinalScore.game + ' error while checking if game exists'
    } )
}

const gameExists = (gameFinalScore, result) => {
    const filter = {
        game: gameFinalScore.game,
        scoresDate: gameFinalScore.scoresDate,
        team: gameFinalScore.team
    }

    const exists = result.filter((item) => {
        for (var key in filter) {

            if (item[key] === undefined){
                return false;
            }
            
            if(Array.isArray(filter[key]) && simpleEqual(item[key], filter[key])) {
                return true;
            } else if (item[key] !== filter[key]) {
                return false;
            }

        }
        return true;
    })

    return exists
}

const simpleEqual = (arr1, arr2) => {
    if(!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return
    }
    if((JSON.stringify(arr1) === JSON.stringify(arr2))) 
    {
        return true
    } 
    else {
        return false
    }
}

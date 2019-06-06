const calculateGameHistory = (history, game, team) => {
    // console.log(history, game, team)

    if(!history) return null

        const filter = {
            game,
            team,
            
        }

        // console.log(filter)
    
        const exists = history.filter((item) => {
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
    
        console.log('HISTORICAL RECORDS: ', exists)
        return exists
    }

    // return console.log(history, game, team)
// }

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

export default calculateGameHistory
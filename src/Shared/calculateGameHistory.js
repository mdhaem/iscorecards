const calculateGameHistory = (history, game, team) => {

    if(!history) return null

        const filter = {
            game,
            team,
            
        }

    
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

        let cumulativeHistory = []
console.log(exists)
        exists.map( item => 
            {
                if (typeof(item.winner.sum) !== 'undefined') {cumulativeHistory.push( { key: item.winner.value[0].key})}//, value: item.winner.sum })}
                if (typeof(item.winner.score) !== 'undefined') {cumulativeHistory.push( { key: item.winner.id})}//, value: item.winner.score })}
                return cumulativeHistory
            }
        )
         cumulativeHistory.map((item) => 
            { 
                if( item.key.length >= 4 ) { item.key = "history" + item.key.slice(-1) }
                return cumulativeHistory
            } 
        )

        //  cumulativeHistory.map((item) => { item.key.length === 5 ? item.key = item.key.slice(0,3) + item.key.slice(-1): null } )
         console.log('cumulativeHistory: ', cumulativeHistory)

         const result = cumulativeHistory.reduce((r, obj) => r.concat(obj.key), []);
         console.log(result)

        //  let allNames = {}
         var countedWins = result.reduce(function (allNames, name) { 
            if (name in allNames) {
              allNames[name]++;
            }
            else {
              allNames[name] = 1;
            }
            return allNames;
          }, {});
 console.log(countedWins)
        
        return countedWins
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

export default calculateGameHistory
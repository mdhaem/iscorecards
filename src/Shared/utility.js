export const updateObject = (oldObject, updatedProperties) => {
    // console.log(...oldObject);
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// export const getHandsFromSelectedGame = (selectedGame, games) => {
//     const gameUnique = getUniqueArray(games)
//     return _.find(gameUnique, function(o) {return o.game === selectedGame}).hands
// }


export const getFirstNamesFromTeamsProps = (propsArray) => {
    let names = []
    const teamFirstNames = []

    propsArray.map((item) => {
        names = []
        item.team.map( team => {
            return names.push(team.split(' ')[0])
        })
        return teamFirstNames.push(names)
    })

    return teamFirstNames
}

export const getUniqueGameNamesFromTeamProps = (propsArray) => {
    const propGames = []

    propsArray.map(item => {
        return propGames.push(item.game)
    })

    return [...new Set(propGames)]
}

export const getUniqueArray = (propsArray) => {
    const uniqueArray = propsArray.filter((thing,index) => {
        return index === propsArray.findIndex(obj => {
          return JSON.stringify(obj) === JSON.stringify(thing);
        })
      })
    return uniqueArray
}

export const checkValidity = (value, rules) => {
    // console.log(typeof value, value.length, rules)
    let isValid = true;
    if (!rules) {
        return true;
    }

    if(rules.changed) {
        isValid = !value.includes('...select');
        // console.log(isValid)
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && value.length > 0 && isValid;
        // console.log(isValid)
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isChars) {
        const pattern = /^[a-zA-Z\s]*$/
        // console.log(pattern.test(value))
        isValid = pattern.test(value) && value.trim() !== ''  && isValid
    }

    if(rules.arrayLength) {
        const valueArray = value.split(' ')
        isValid = valueArray.length >= rules.arrayLength && isValid
    }

    // console.log(isValid)
    return isValid;
}

export const times = n => f => {
    let iter = i => {
      if (i === n) return
      f (i)
      iter (i + 1)
    }
    return iter (0)
  }

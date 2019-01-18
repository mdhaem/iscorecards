export const updateObject = (oldObject, updatedProperties) => {
    console.log(...oldObject);
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    console.log(typeof value, value.length, rules)
    let isValid = true;
    if (!rules) {
        return true;
    }

    if(rules.changed) {
        isValid = value.includes('...chose a');
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && value.length > 0 && isValid;
        console.log(isValid)
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
        console.log(pattern.test(value))
        isValid = pattern.test(value) && value.trim() !== ''  && isValid
    }

    if(rules.arrayLength) {
        const valueArray = value.split(' ')
        isValid = valueArray.length >= rules.arrayLength && isValid
    }

    console.log(isValid)
    return isValid;
}

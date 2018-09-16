export const updateObject = (oldObject, updatedProperties) => {
    console.log(...oldObject);
    return {
        ...oldObject,
        ...updatedProperties
    };
};
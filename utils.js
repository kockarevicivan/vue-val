export const set = (key, value, formObject) => {
    formObject[key].value = value;
    formObject[key].error = null;

    for(let ck in formObject[key].constraints) {
        const validationResult = formObject[key].constraints[ck](value);
        
        formObject[key].valid = validationResult.valid;

        if(!validationResult.valid) {
            formObject[key].error = validationResult.message;

            break;
        }
    }
};

export const validate = (formObject) => {
    for(let field in formObject)
        if(!formObject[field].valid) return false;    
    
    return true;
};

export default {
    validate,
    set
};
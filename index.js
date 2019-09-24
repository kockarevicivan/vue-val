const messages = {
    required: () => `Field is required.`,
    notNull: () => `Field cannot be null.`,
    maxValue: (maximum) => `Value cannot be greater than ${maximum}.`,
    minValue: (minimum) => `Value must be greater than ${minimum}.`,
    maxLength: (maxCharacters) => `Maximum length is ${maxCharacters} characters.`,
    minLength: (minCharacters) => `Minimum length is ${minCharacters} characters.`,
    isValue: (values) => `Value must be one of the following: ${values.join(', ')}`,
    isEmail: () => `Value must be an e-mail address.`,
    isNumeric: () => `Value must be numeric.`,
    isUrl: () => `Value must be a valid URL.`
};

const lambdas = {
    required: (value) => !!value && typeof value == 'string' ? value.length && value.trim().length : true,
    notNull: (value) => value && value.length && value.trim().length && value != 'null',
    maxValue: (max) => (value) => value <= max,
    minValue: (min) => (value) => value >= min,
    maxLength: (max) => (value) => value ? value.length <= max : true,
    minLength: (min) => (value) => value ? value.length >= min : true,
    isValue: (values) => (value) => values.indexOf(value) != -1,
    isEmail: (value) => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    isNumeric: (value) => value && !isNaN(value),
    isUrl: (value) => value && !!(new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i').test(value))
};

const validation = {
    required: (value) => ({ valid: lambdas.required(value), message: messages.required() }),
    notNull: (value) => ({ valid: lambdas.notNull(value), message: messages.notNull() }),
    maxValue: (max) => (value) => ({ valid: lambdas.maxValue(max)(value), message: messages.maxValue(max) }),
    minValue: (min) => (value) => ({ valid: lambdas.minValue(min)(value), message: messages.minValue(min) }),
    maxLength: (max) => (value) => ({ valid: lambdas.maxLength(max)(value), message: messages.maxLength(max) }),
    minLength: (min) => (value) => ({ valid: lambdas.minLength(min)(value), message: messages.minLength(min) }),
    isValue: (values) => (value) => ({ valid: lambdas.isValue(values)(value), message: messages.isValue(values) }),
    isEmail: (value) => ({ valid: lambdas.isEmail(value), message: messages.isEmail() }),
    isNumeric: (value) => ({ valid: lambdas.isNumeric(value), message: messages.isNumeric() }),
    isUrl: (value) => ({ valid: lambdas.isUrl(value), message: messages.isUrl() })
};

const utils = {
    setField: (formObject, key, value) => {
        formObject[key].value = value;
    
        for(let ck in formObject[key].constraints) {
            const validationResult = formObject[key].constraints[ck](value);
            
            formObject[key].valid = validationResult.valid;
            formObject[key].message = validationResult.message;

            if(!validationResult.valid) break;
        }
    },
    
    isFormValid: (formObject) => {
        for(let field in formObject)
            if(!formObject[field].valid) return false;    
        
        return true;
    },
    
    getError: (formObject, field) => {
        return formObject[field] ? formObject[field].message : null;
    }
};

export {
    messages,
    validation,
    utils
};
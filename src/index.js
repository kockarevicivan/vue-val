import messages from "./messages"
import lambdas from "./lambdas"

const facade = {
    required: (value) => ({ valid: lambdas.required(value), message: messages.required() }),
    notNull: (value) => ({ valid: lambdas.notNull(value), message: messages.notNull() }),
    maxValue: (max) => (value) => ({ valid: lambdas.maxValue(max)(value), message: messages.maxValue(max) }),
    minValue: (min) => (value) => ({ valid: lambdas.minValue(min)(value), message: messages.minValue(min) }),
    maxLength: (max) => (value) => ({ valid: lambdas.maxLength(max)(value), message: messages.maxLength(max) }),
    minLength: (min) => (value) => ({ valid: lambdas.minLength(min)(value), message: messages.minLength(min) }),
    isValue: (values) => (value) => ({ valid: lambdas.isValue(values)(value), message: messages.isValue(values) }),
    isEmail: (value) => ({ valid: lambdas.isEmail(value), message: messages.isEmail() }),
    isNumeric: (value) => ({ valid: lambdas.isNumeric(value), message: messages.isNumeric() }),
    isUrl: (value) => ({ valid: lambdas.isUrl(value), message: messages.isUrl() }),

    set: (key, value, formObject) => {
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
    },
    validate: (formObject) => {
        for(let field in formObject)
            if(!formObject[field].valid) return false;    

        return true;
    }
}

export const required = facade.required;
export const notNull = facade.notNull;
export const maxValue = facade.maxValue;
export const minValue = facade.minValue;
export const maxLength = facade.maxLength;
export const minLength = facade.minLength;
export const isValue = facade.isValue;
export const isEmail = facade.isEmail;
export const isNumeric = facade.isNumeric;
export const isUrl = facade.isUrl;

export const set = facade.set;
export const validate = facade.validate;

export default {
    required: facade.required,
    notNull: facade.notNull,
    maxValue: facade.maxValue,
    minValue: facade.minValue,
    maxLength: facade.maxLength,
    minLength: facade.minLength,
    isValue: facade.isValue,
    isEmail: facade.isEmail,
    isNumeric: facade.isNumeric,
    isUrl: facade.isUrl,

    set: facade.set,
    validate: facade.validate,

    // messages: messages,
    // lambdas: lambdas
};

export { default as messages } from './messages';
export { default as lambdas } from './lambdas';
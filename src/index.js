import messages from "./messages"
import lambdas from "./lambdas"

// Facade for everything that will be exported by the module.
const facade = {
    /** 
     * Checks whether value is Falsy, or, if value is a string, whether it's Falsy when trimmed.
     */
    required: (value) => ({ valid: lambdas.required(value), message: messages.required() }),

    /** 
     * Checks whether value is explicitly null.
     */
    notNull: (value) => ({ valid: lambdas.notNull(value), message: messages.notNull() }),

    /** 
     * Checks whether value is greater than the provided maximum.
     */
    maxValue: (maximum) => (value) => ({ valid: lambdas.maxValue(maximum)(value), message: messages.maxValue(maximum) }),

    /** 
     * Checks whether value is lower than the provided minimum.
     */
    minValue: (minimum) => (value) => ({ valid: lambdas.minValue(minimum)(value), message: messages.minValue(minimum) }),

    /**
     * Checks whether value is shorter in length than provided maximum.
     */
    maxLength: (maximumCharacters) => (value) => ({ valid: lambdas.maxLength(maximumCharacters)(value), message: messages.maxLength(maximumCharacters) }),

    /**
     * Checks whether value is longer in length than provided minimum.
     */
    minLength: (minimumCharacters) => (value) => ({ valid: lambdas.minLength(minimumCharacters)(value), message: messages.minLength(minimumCharacters) }),

    /**
     * Checks whether value is a member of the provided values list.
     */
    isValue: (values) => (value) => ({ valid: lambdas.isValue(values)(value), message: messages.isValue(values) }),

    /**
     * Checks whether value is a valid e-mail address.
     */
    isEmail: (value) => ({ valid: lambdas.isEmail(value), message: messages.isEmail() }),

    /**
     * Checks whether value is explicitly numeric.
     */
    isNumeric: (value) => ({ valid: lambdas.isNumeric(value), message: messages.isNumeric() }),

    /**
     * Checks whether value is lower than the provided minimum.
     */
    isUrl: (value) => ({ valid: lambdas.isUrl(value), message: messages.isUrl() }),


    /**
     * Utility function for form field setting and auto-validation.
     */
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

    /**
     * Utility function for validation of entire form.
     */
    validate: (formObject) => {
        for(let field in formObject)
            if(!formObject[field].valid) return false;    

        return true;
    }
}

// Validation methods export.
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

// Utility methods export.
export const set = facade.set;
export const validate = facade.validate;

// Default export to supress warnings.
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
    validate: facade.validate
};

// Export for imported packages (used for custom lambdas and messages).
export { default as messages } from './messages';
export { default as lambdas } from './lambdas';
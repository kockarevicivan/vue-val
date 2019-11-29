export default {
    required: () => `Field is required.`,
    notNull: () => `Field cannot be null.`,
    maxValue: (maximum) => `Value cannot be greater than ${maximum}.`,
    minValue: (minimum) => `Value must be greater than ${minimum}.`,
    maxLength: (maxCharacters) => `Maximum length is ${maxCharacters} characters.`,
    minLength: (minCharacters) => `Minimum length is ${minCharacters} characters.`,
    isValue: (values) => `Value must be one of the following: ${values.join(', ')}`,
    isEmail: () => `Value must be an e-mail address.`,
    isNumeric: () => `Value must be numeric.`,
    isTime: () => `Time must be in a valid format: [hh:mm].`,
    isDate: () => `Date must be in a valid format: [dd.mm.yyyy.].`,
    isUrl: () => `Value must be a valid URL.`,
    customRegex: () => `Invalid format.`
};
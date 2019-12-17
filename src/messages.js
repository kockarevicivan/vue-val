// List of default error messages, dependant on 0 or more parameters (e.g. maxCharacters).
export default {
    required: function () { return 'Field is required.'; },
    notNull: function () { return 'Field cannot be null.'; },
    notUndefined: function () { return 'Field cannot be undefined.'; },
    maxValue: function (maximum) { return 'Value cannot be greater than ' + maximum + '.'; },
    minValue: function (minimum) { return 'Value must be greater than ' + minimum + '.'; },
    maxLength: function (maximumCharacters) { return 'Maximum length is ' + maximumCharacters + ' characters.'; },
    minLength: function (minimumCharacters) { return 'Minimum length is ' + minimumCharacters + ' characters.'; },
    isValue: function (values) { return 'Value must be one of the following: ' + values.join(', '); },
    isEmail: function () { return 'Value must be an e-mail address.'; },
    isNumeric: function () { return 'Value must be numeric.'; },
    isTime: function () { return 'Time must be in a valid format: [hh:mm].'; },
    isDate: function () { return 'Date must be in a valid format: [dd.mm.yyyy.].'; },
    isUrl: function () { return 'Value must be a valid URL.'; },
    customRegex: function () { return 'Invalid format.'; }
};
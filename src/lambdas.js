// List of default validation lambas, dependant on 1 (always value) or more parameters (e.g. maxCharacters).
export default {
    required: (value) => (value != null && value != undefined) && (typeof value == 'string' ? !!(value.length && value.trim().length) : true),
    notNull: (value) => value != null,
    notUndefined: (value) => value != undefined,
    maxValue: (maximum) => (value) => value <= maximum,
    minValue: (minimum) => (value) => value >= minimum,
    maxLength: (maximumCharacters) => (value) => value ? value.length <= maximumCharacters : true,
    minLength: (minimumCharacters) => (value) => value ? value.length >= minimumCharacters : true,
    isValue: (values) => (value) => values.indexOf(value) != -1,
    isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    isNumeric: (value) => value && !isNaN(value),
    isTime: (value) => /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(value),
    isDate: (value) => /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}\.$/.test(value),
    isUrl: (value) => (new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i').test(value)),
    customRegex: (regex) => (value) => value && !!(new RegExp(regex,'i').test(value))
};
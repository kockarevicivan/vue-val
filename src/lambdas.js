// List of default validation lambas, dependant on 1 (always value) or more parameters (e.g. maxCharacters).
export default {
    required: (value) => !!value && (typeof value == 'string' ? !!(value.length && value.trim().length) : true),
    notNull: (value) => value != null,
    maxValue: (maximum) => (value) => value <= maximum,
    minValue: (minimum) => (value) => value >= minimum,
    maxLength: (maximumCharacters) => (value) => value ? value.length <= maximumCharacters : true,
    minLength: (minimumCharacters) => (value) => value ? value.length >= minimumCharacters : true,
    isValue: (values) => (value) => values.indexOf(value) != -1,
    isEmail: (value) => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    isNumeric: (value) => value && !isNaN(value),
    isUrl: (value) => value && !!(new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$','i').test(value))
};
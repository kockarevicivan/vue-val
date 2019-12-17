// List of default validation lambas, dependant on 1 (always value) or more parameters (e.g. maxCharacters).
export default {
    required: function (value) {
        return (value != null && value != undefined) && (typeof value == 'string' ? !!(value.length && value.trim().length) : true);
    },
    notNull: function (value) {
        return value != null;
    },
    notUndefined: function (value) {
        return value != undefined;
    },
    maxValue: function (maximum) {
        return function (value) {
            return value <= maximum;
        };
    },
    minValue: function (minimum) {
        return function (value) {
            return value >= minimum;
        };
    },
    maxLength: function (maximumCharacters) {
        return function (value) {
            return value ? value.length <= maximumCharacters : true;
        };
    },
    minLength: function (minimumCharacters) {
        return function (value) {
            return value ? value.length >= minimumCharacters : true;
        };
    },
    isValue: function (values) {
        return function (value) {
            return values.indexOf(value) != -1;
        };
    },
    isEmail: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    isNumeric: function (value) {
        return value && !isNaN(value);
    },
    isTime: function (value) {
        return /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(value);
    },
    isDate: function (value) {
        return /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}\.$/.test(value);
    },
    isUrl: function (value) {
        return (new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i').test(value));
    },
    customRegex: function (regex) {
        return function (value) {
            return value && !!(new RegExp(regex, 'i').test(value));
        };
    }
};
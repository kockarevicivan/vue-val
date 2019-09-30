export default {
    required: (value) => !!value && (typeof value == 'string' ? !!(value.length && value.trim().length) : true),
    notNull: (value) => value != null,
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
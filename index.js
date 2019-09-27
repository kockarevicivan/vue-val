import messages from "./messages"
import utils from "./utils"
import lambdas from "./lambdas"

export const required = (value) => ({ valid: lambdas.required(value), message: messages.required() });
export const notNull = (value) => ({ valid: lambdas.notNull(value), message: messages.notNull() });
export const maxValue = (max) => (value) => ({ valid: lambdas.maxValue(max)(value), message: messages.maxValue(max) });
export const minValue = (min) => (value) => ({ valid: lambdas.minValue(min)(value), message: messages.minValue(min) });
export const maxLength = (max) => (value) => ({ valid: lambdas.maxLength(max)(value), message: messages.maxLength(max) });
export const minLength = (min) => (value) => ({ valid: lambdas.minLength(min)(value), message: messages.minLength(min) });
export const isValue = (values) => (value) => ({ valid: lambdas.isValue(values)(value), message: messages.isValue(values) });
export const isEmail = (value) => ({ valid: lambdas.isEmail(value), message: messages.isEmail() });
export const isNumeric = (value) => ({ valid: lambdas.isNumeric(value), message: messages.isNumeric() });
export const isUrl = (value) => ({ valid: lambdas.isUrl(value), message: messages.isUrl() });

export {
    messages,
    utils
};
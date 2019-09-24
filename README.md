# vue-val

Validation toolkit for VueJS. Offers both custom and 'plug and play' validation. 

## Usage

### Manual validation
First, import necessary validation methods into your component:
```
import { isEmail } from 'vue-val/validation'
```

Then, on field change, call the proper validation method:
```
methods() {
    ...
    onEmailChange(email) {
        const validationResult = isEmail(email);
    }
    ...
}
```

Validation result will be in the following format (validation indicator and error message):
```
{
    valid: <boolean>,
    message: <string>
}
```

Here is a list of currently available validation methods:
```
required(value); // Checks whether passed variable contains a value.
notNull(value); // Checks whether passed variable is null.
maxValue(max)(value); // Checks whether passed value is lower than the passed maximum.
minValue(min)(value); // Checks whether passed value is greater than the passed minimum.
maxLength(max)(value); // Checks whether passed value's length is less than passed maximum.
minLength(min)(value); // Checks whether passed value's length is greater than passed minimum.
isValue(allowedValues)(value); // Checks whether passed value is one of the passed allowed values.
isEmail(value); // Checks whether passed value is a proper e-mail address.
isNumeric(value); // Checks whether passed value is numeric.
isUrl(value);  // Checks whether passed value is a proper URL.
```

### Integrated validation
Package can be used with built-in validation. First, in the data section of your component, create a validation object for your form, in the following format:
```
data() {
    return {
    
        ...

        formObject: {

            ...

            name: {
                valid: false, // We suppose that field is initially invalid.
                message: null, // We suppose that there is still no error message for this field.
                constraints: [required, maxLenth(20)] // List of validation constraints, imported from the package
            },
            email: {
                valid: false,
                message: null,
                constraints: [required, maxLenth(6), isEmail]
            }

            ...

        }

        ...
        
    };
};
```

Second, import methods 'setField' and 'getError' from the package and wrap them with Vue component methods (since package methods cannot be directly invoked from VueJS markup) like this:
```
setField(key, value) {
    return setField(this.formObject, key, value); // Object that we previously created, name of the field as 'key' and current value of the field.
},
getError(key) {
    return getErrorText(this.formObject, key); // Object that we previously created and name of the field as 'key'.
}
```

Third, use these methods inside your markup:
```
<!-- For field 'name' -->
<span class="error-message">{{ getError('name') }}</span>
<input type="text" @change="value => setField('name', value)" />

<!-- For field 'email' -->
<span class="error-message">{{ getError('email') }}</span>
<input type="text" @change="value => setField('email', value)" />
```

You can also import one more method, called 'isFormValid' from the package, to check whether the form object is valid. For example, to disable submit button if the form is invalid:

First, import the method:
```
import { isFormValid } from 'vue-val/validation'
```

Second, wrap the method with internal component method:
```
methods() {
    ...
    isFormValid() {
        return isObjectValid(this.formObject);
    }
    ...
}
```

Third, use it in markup:
```
<button :disabled="!isFormValid()">Submit form<button/>
```

### Custom messages and custom validations
You can also set custom error messages like this:

```
import { messages } from 'vue-val'

...

messages.required = () => `M8, field is required!`;
messages.maxLength = (maxCharacters) => `We don't allow more than ${maxCharacters} characters!!`;
```
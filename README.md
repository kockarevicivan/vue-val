# vue-val

Validation toolkit for VueJS. Offers both manual and 'plug and play' validation. 

## Usage

### Manual validation
First, import necessary validation methods into your component:
```
import { isEmail } from 'vue-val'
```

Then, on field change (or any other event you want to handle), call the proper validation method:
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

Here's a list of currently available validation methods:
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
isTime(value); // Checks whether passed value is a valid date string (accepts '/', '-' and '.' delimiters).
isDate(value); // Checks whether passed value is a valid time string.
isUrl(value);  // Checks whether passed value is a proper URL.
customRegex(value);  // Checks whether value matches the provided regex.
```

### Integrated validation
Package can be used with its 'plug and play' validation. First, in the data section of your component, create a validation object for your form, in the following format:
```
data() {
    return {
    
        ...

        form: {

            ...

            name: {
                valid: false, // We suppose that field is initially invalid.
                error: null, // We suppose that there is still no error message for this field.
                constraints: [required, maxLenth(20)] // List of validation constraints, imported from the package
            },
            email: {
                valid: false,
                error: null,
                constraints: [required, maxLenth(6), isEmail]
            }

            ...

        }

        ...
        
    };
};
```

Second, import methods 'set' and 'validate' and put them in the data of the component (since package methods cannot be directly invoked from VueJS markup) like this:
```
import { set, validate } from 'vue-val';

data() {
    return {
    
        ...
        set, // Map 'set' to a local data property.
        validate, // Map 'validate' to a local data property.
        form: {

            ...

            name: {
                valid: false,
                error: null,
                constraints: [required, maxLenth(20)]
            },
            email: {
                valid: false,
                error: null,
                constraints: [required, maxLenth(6), isEmail]
            }

            ...

        }

        ...
        
    };
};
```

Third, use these methods inside your component:
```
<!-- For field 'name' -->
<span class="error-message">{{ form.name.error }}</span>
<input type="text" v-on:change="e => set('name', e.target.value, form)" />

<!-- For field 'email' -->
<span class="error-message">{{ form.email.error }}</span>
<input type="text" v-on:change="e => set('email', e.target.value, form)" />

<!-- Conditionally disabled button -->
<button :disabled="!validate(form)">Submit form<button/>
```

### Custom messages
You can also set custom error messages like this:

```
import { messages } from 'vue-val'

...

messages.required = () => `M8, field is required!`;
messages.maxLength = (maxCharacters) => `We don't allow more than ${maxCharacters} characters!!`;
```

Note that every message is defined as lambda expression. This is due to the messages that depend on one or more parameters (e.g. maximum number of characters).
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

export const emailRule = (val) =>
  emailPattern.test(val) || 'Please enter a valid email address';

export const required = (val) => !!val || 'Field is required';

export const positiveNumber = (val) =>
  (!!val && parseInt(val) > 0) || 'Value should be positive';

export const positiveDecimal = (val) =>
  (!!val && parseInt(val) > 0) || 'Value should be positive';

export const isNumber = (val) => Number(val) == val || 'Enter Numeric Value';

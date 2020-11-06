import { date } from 'quasar';
/*
//Note : do not use rules in quotes
<q-input v-model="user.full_name" :rules="[required]" />
*/
const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;

export const emailRule = val =>
  emailPattern.test(val) || 'Please enter a valid email address';

export const required = val => !!val || 'Field is required';

export const positiveNumber = val =>
  (!!val && parseInt(val) > 0) || 'Value should be positive';

export const positiveDecimal = val =>
  (!!val && parseInt(val) > 0) || 'Value should be positive';

export const isNumber = val => Number(val) == val || 'Enter Numeric Value';

export const isPhoneNumber = val => {
  return (
    (val != null && Number(val) == val && val.length >= 10) ||
    'Enter valid mobile number'
  );
};

export const isDateValid = v => {
  if (v == null || v.length < 10) {
    return 'Invalid Date';
  }
  // ISO standard YYYY-MM-DD
  // date is nonstandard
  // attempt to standerdize it before validation
  const standardizedDate = v
    .split('-')
    .reverse()
    .join('-');
  // console.log('date', Quasar.utils.date.formatDate(standardizedDate, 'MM/DD/YYYY'))
  //return Quasar.utils.date.isValid(standardizedDate) || 'Invalid Date';
  return date.isValid(standardizedDate) || 'Invalid Date';
};

import Vue from 'vue';
import { date } from 'quasar';
import Vue2Filters from 'vue2-filters';

var Vue2FiltersConfig = {
  capitalize: {
    onlyFirstLetter: false
  },
  number: {
    format: '0',
    thousandsSeparator: ',',
    decimalSeparator: '.'
  },
  bytes: {
    decimalDigits: 2
  },
  percent: {
    decimalDigits: 2,
    multiplier: 100
  },
  currency: {
    symbol: '₹',
    decimalDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: true,
    showPlusSign: false
  },
  pluralize: {
    includeNumber: false
  },
  ordinal: {
    includeNumber: false
  }
};
Vue.use(Vue2Filters, Vue2FiltersConfig);

Vue.filter('localDate', function(value) {
  if (!value) return '';
  value = value.toString();
  return date.formatDate(new Date(value), 'DD-MM-YYYY');
});

Vue.filter('localDateTime', function(value) {
  if (!value) return '';
  value = value.toString();
  return date.formatDate(new Date(value), 'DD-MM-YYYY hh:mm A');
});

Vue.filter('localTime', function(value) {
  if (!value) return '';
  value = value.toString();
  return date.formatDate(new Date(value), 'hh:mm A');
});

import vueAwesomeCountdown from 'vue-awesome-countdown';

Vue.use(vueAwesomeCountdown, 'vac'); // Component name, `countdown` and `vac` by default

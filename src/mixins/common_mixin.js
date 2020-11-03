import { date } from 'quasar';

export default {
  methods: {
    popupMessage(action, message, position = 'bottom') {
      this.$q.notify({
        type: action,
        position,
        message: message
      });
    },
    mysqlDate(value) {
      var parts = value.split('-');
      //expecting dd-mm-yyyy
      return date.formatDate(
        new Date(parts[2], parts[1] - 1, parts[0]),
        'YYYY-MM-DD'
      );
    }
    // localDate: val =>
    //   val.toLocaleString('en-IN', {
    //     maximumFractionDigits: 2,
    //     style: 'currency',
    //     currency: 'INR'
    //   })
  }
};

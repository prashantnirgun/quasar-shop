import { date } from 'quasar';

export default {
  methods: {
    popupMessage(action, message) {
      this.$q.notify({
        type: action,
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
  }
};

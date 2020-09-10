export default {
  methods: {
    popupMessage(action, message) {
      this.$q.notify({
        type: action,
        message: message
      });
    }
  }
};

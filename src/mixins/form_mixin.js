import common_mixin from 'src/mixins/common_mixin';
export default {
  mixins: [common_mixin],
  methods: {
    validateForm() {
      return this.$refs[this.form]
        .validate()
        .then(valid => {
          console.log('form name is ', this.form);
          return valid;
        })
        .catch(error => {
          console.log(this.form + 'valdateForm() Failed', error);
          return false;
        });
    },
    reset() {
      this.data = this.newData();
      this.$refs[this.form].resetValidation();
    },
    close(payload) {
      if (payload.reset === true) {
        this.data = this.newData();
      }
      this.$emit('close', !payload ? { action: false } : payload);
    }
  }
};

import common_mixin from 'src/mixins/common_mixin';
export default {
  mixins: [common_mixin],
  methods: {
    validateForm() {
      return this.$refs[this.form]
        .validate()
        .then(valid => {
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

    //add a primary key if not added by default
    // submitData(id) {
    //   let data = {};
    //   if (id === 0) {
    //     data = this.data;
    //   } else {
    //     Object.keys(this.data).map(key => {
    //       if (this.data[key] !== this.primary[key]) {
    //         data[key] = this.data[key];
    //       }
    //     });
    //   }
    //   //console.log(data, Object.keys(data).length);
    //   return data;
    // }
  }
};

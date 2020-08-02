export default {
  computed: {
    isDesktop() {
      return this.$q.platform.is.desktop ? true : false;
    },
    isMobile() {
      return this.$q.platform.is.mobile ? true : false;
    }
  }
};

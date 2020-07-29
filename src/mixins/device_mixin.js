export default {
  computed: {
    isDesktop() {
      return this.$q.platform.is.desktop;
    },
    isMobile() {
      return this.$q.platform.is.mobile;
    }
  }
};

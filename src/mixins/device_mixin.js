export default {
  computed: {
    isDesktop() {
      return this.$q.platform.is.desktop ? true : false;
    },
    isMobile() {
      return this.$q.platform.is.mobile ? true : false;
    },
    displaySize() {
      const width = this.$q.screen.width;
      switch (true) {
        case width <= 320:
          return 1;
          break;
        case width <= 375:
          return 1;
          break;
        case width >= 640 && width <= 768:
          return 2;
          break;
        case width <= 1024:
          return 4;
          break;
        default:
          return 6;
          break;
      }
    }
  }
};

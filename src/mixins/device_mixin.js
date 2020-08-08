export default {
  computed: {
    isDesktop() {
      return this.$q.platform.is.desktop ? true : false;
    },
    isMobile() {
      return this.$q.platform.is.mobile ? true : false;
    },
    screenWidth() {
      const width = this.$q.screen.width;
      //      const heigth = this.$q.screen.height;
      // let orientation = 'Portrait'
      // switch (true) {
      //   case (width <= 360):

      //     return 'xs';
      //     break;
      //   case '360':
      //     return 'sm';
      //     break;
      //   case '360':
      //     return 'md';
      //     break;
      //   default:
      //     return 'lg';
      //     break;
      // }
    }
  }
};

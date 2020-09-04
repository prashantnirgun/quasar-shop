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
        case width >= 400 && width <= 768:
          return 2;
          break;
        case width <= 1024:
          return 3;
          break;
        default:
          return 6;
          break;
      }
    },
    deviceWidth(){
      return this.$q.screen.width;
    },
    deviceHeight(){      
      return this.$q.screen.height;
    },
    deviceType(){
      return this.isDesktop ? 'Desktop' : 'Mobile'
   },
   osVersion(){     
    if (navigator.userAgent.indexOf("Win") != -1) return "Windows";
    if (navigator.userAgent.indexOf("Mac") != -1) return "Macintosh";
    if (navigator.userAgent.indexOf("Linux") != -1) return "Linux";
    if (navigator.userAgent.indexOf("Android") != -1) return "Android";
    if (navigator.userAgent.indexOf("like Mac") != -1) return "iOS";
   }
  }
};

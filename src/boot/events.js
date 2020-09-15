import Vue from 'vue';
const bus = new Vue();
export default bus;

import VueGtag from 'vue-gtag';

Vue.use(VueGtag, {
  config: { id: 'UA-176056037-1' }
  // router
});

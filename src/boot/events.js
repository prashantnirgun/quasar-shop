import Vue from 'vue';
const bus = new Vue();

import VueGtag from 'vue-gtag';

Vue.use(VueGtag, {
  config: { id: 'UA-176056037-1' }
});

export default bus;

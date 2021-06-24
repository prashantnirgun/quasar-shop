<template>
  <div class="">
    This is test page
    <q-btn @click="window.location.reload()">Reload</q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      console.log('route changed', from.name, from);
      if (from.name === 'test') {
        console.log('now going to reset cart');
        //this.cartReset();
      } else {
        console.log('route not detected ====', from.name);
      }
    }
  },
  methods: {
    reloadPage() {
      window.location.reload();
    }
  }
};
</script>

<template>
  <div></div>
</template>

<script>
import { LocalStorage } from 'quasar';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('cart', ['resetCartState']),
    ...mapActions('user', ['setToken', 'setUser'])
  },
  created() {
    LocalStorage.clear();
    this.resetCartState();
    this.setToken(null);
    this.setUser(null);
    this.$router.push('/');
  }
};
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 text-center">Confirmation!</div>
      </q-card-section>
      <q-card-section class="col-5 flex flex-center cursor-pointer">
        <q-avatar :size="getImageSize">
          <q-img class="rounded-borders" :src="imgUrl"> </q-img>
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle2 q-pb-lg text-center">
          Thank you for ordering with us.
        </div>
        <div>{{ lorem }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn bordered class="text-capitalize" :to="{ name: 'orders' }"
          >Order History</q-btn
        >
        <q-btn
          bordered
          outline
          color="primary"
          class="text-capitalize"
          :to="{ name: 'home' }"
          >Home Page</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', ['user', 'token']),
    imgUrl() {
      return this.user.image_filename && this.user.image_filename.length > 5
        ? `${process.env.STATIC}users/${this.user.company_id}/${this.user.image_filename}`
        : 'https://cdn.quasar.dev/img/boy-avatar.png';
    },
    getImageSize() {
      return this.isDesktop ? '200px' : '125px';
    }
  },
  methods: {
    ...mapActions('cart', ['cartReset'])
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

<template>
  <div class="q-pa-md row items-start q-gutter-md justify-center">
    <q-card class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6 text-center">Confirmation!</div>
      </q-card-section>
      <q-card-section
        v-if="isUserLoggedIn"
        class="col-5 flex flex-center cursor-pointer"
      >
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
        <q-btn
          v-if="isUserLoggedIn"
          bordered
          class="text-capitalize"
          :to="{ name: 'orders' }"
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
  data() {
    return {
      loren:
        's simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recentl'
    };
  },
  computed: {
    ...mapGetters('user', ['user', 'token']),
    ...mapGetters(['isUserLoggedIn']),

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
  },
  mounted() {
    console.log('confirmation is mounted');
    this.cartReset();
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>

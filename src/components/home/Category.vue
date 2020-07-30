<template>
  <div class=" row wrap justify-evenly q-pa-sm items-start q-gutter-md">
    <q-card
      v-for="data in lists"
      :key="data.category_id"
      class="rounded-borders cursor-pointer shadow-8"
    >
      <q-img
        class=""
        :src="data.image_filename"
        :height="getSize"
        :width="getSize"
        @click="$router.push('/category')"
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ data.category_name }}
        </div>
      </q-img>
      <!-- <q-card-section> </q-card-section> -->
    </q-card>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  data() {
    return {
      lists: []
    };
  },
  mounted() {
    DataService.get('data/category.json')
      .then(response => {
        this.lists = response.data;
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  },
  computed: {
    getSize() {
      return this.isDesktop ? '200px' : '130px';
    }
  }
};
</script>

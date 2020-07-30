<template>
  <div class=" row wrap justify-evenly q-pa-md items-start q-gutter-md">
    <q-card
      v-for="data in lists"
      :key="data.category_id"
      class="rounded-borders cursor-pointer shadow-8"
    >
      <q-card-section>
        <q-img class="" :src="data.image_filename" height="200px" width="200px">
          <div class="absolute-bottom text-subtitle2 text-center">
            {{ data.category_name }}
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';

export default {
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
  }
};
</script>

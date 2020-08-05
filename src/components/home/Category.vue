<template>
  <div class="row wrap justify-evenly q-pa-sm items-start q-gutter-md">
    <q-card
      v-for="data in lists"
      :key="data.category_id"
      class="rounded-borders cursor-pointer shadow-8"
    >
      <q-img
        :src="data.image_filename"
        placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
        :height="getSize"
        :width="getSize"
        spinner-color="primary"
        spinner-size="82px"
        @click="$router.push(`/products/${data.category_id}`)"
      >
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ data.category_name }}
        </div>
      </q-img>
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
      return this.isDesktop ? '200px' : '150px';
    }
  }
};
</script>

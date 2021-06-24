<template>
  <div>
    <div class="" style="color: #1f509e;">
      Category
    </div>

    <div
      class="row wrap justify-evenly items-start content-between q-gutter-sm"
    >
      <div v-for="data in lists" :key="data.category_id">
        <q-card class="rounded-borders cursor-pointer  q-mb-xs my-card">
          <q-img
            :src="data.image_filename"
            placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
            :height="getSize"
            :width="getSize"
            spinner-color="primary"
            spinner-size="82px"
            @click="$router.push(`/category/${data.slug}`)"
          >
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ data.category_name }}
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';
import { mapActions } from 'vuex';

export default {
  props: ['device'],
  mixins: [device_mixin],
  data() {
    return {
      lists: []
    };
  },
  methods: {
    ...mapActions(['updateSidebar'])
  },
  mounted() {
    DataService.get('category')
      .then(response => {
        this.lists = response.data.rows;
        console.log('category got data');
        const option = this.lists.map(item => {
          return {
            label: item.category_name,
            to: '/category/' + item.slug,
            level: 0,
            icon: 'label_important'
          };
        });

        this.updateSidebar({ label: 'Category', list: option, icon: 'list' });
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  },
  computed: {
    getSize() {
      return this.isDesktop ? '200px' : '165px';
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  box-shadow: none
  &:hover
    box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12) !important
</style>

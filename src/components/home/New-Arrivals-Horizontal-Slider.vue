<template>
  <div class="col-12 q-mt-sm">
    <div class="q-pl-md bg-white q-pt-sm ">
      <span class="text-grey-9 text-h6 text-weight-bold">New Arrivals</span>
      <a class="text-primary q-ml-sm cursor-pointer">[see all]</a>
    </div>
    <q-carousel
      v-model="latest_slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      swipeable
      animated
      control-color="primary"
      navigation
      padding
      arrows
      height="260px"
      class="rounded-borders"
    >
      <q-carousel-slide
        v-for="(rows, index) in lists"
        :name="index"
        :key="index"
        class="column no-wrap"
      >
        <!-- <div class="row fit justify-start items-center no-wrap"> -->
        <div
          v-for="row in rows"
          :key="row.product_id"
          @click="$router.push('/details')"
          class="column hover_border_grey text-center"
          :class="columnSize"
        >
          <q-img class="rounded-borders" :src="row.image_filename"> </q-img>
          <div>{{ row.product_name }}</div>
          <div class="text-caption text-weight-bold text-green">
            {{ row.product_name }}
          </div>
          <div>
            <span>₹{{ row.sale_rate }}</span
            ><span
              class="q-ml-sm text-grey-6"
              style="text-decoration: line-through"
              >₹{{ row.mrp }}</span
            >
          </div>
        </div>
        <!-- </div> -->
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import array from 'src/mixins/array_mixin';
import DataService from 'src/services/DataService';
export default {
  props: ['device'],
  mixins: [array],
  data() {
    return {
      latest_slide: 1,
      lists: [],
      column: 1
    };
  },
  computed: {
    columnSize() {
      console.log('class = col-' + this.column);
      return 'col-' + this.column;
    }
  },
  methods: {
    displaySize() {
      const width = this.$q.screen.width;

      switch (true) {
        case width <= 320:
          this.column = 1;
          return this.column;
          break;
        case width <= 375:
          this.column = 2;
          return this.column;
          break;
        case width >= 640 && width <= 768:
          this.column = 3;
          return this.column;
          break;
        case width <= 1024:
          this.column = 5;
          return this.column;
          break;
        default:
          this.column = 7;
          return this.column;
          break;
      }
    }
  },
  mounted() {
    this.displaySize();
    console.log('chunk', this.column);
    DataService.get('data/newArrival.json')
      .then(response => {
        this.lists = this.chunk(response.data, this.displaySize);
      })
      .catch(error => {
        console.log('mixin/ddlb Error', error);
      });
  }
};
</script>
<style lang="sass" scoped>
div
  border-style: solid
  border-width: 5px
</style>

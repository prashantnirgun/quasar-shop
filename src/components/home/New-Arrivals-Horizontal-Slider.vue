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
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <div
            v-for="row in rows"
            :key="row.product_id"
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img style="" class="rounded-borders" :src="row.image_filename">
            </q-img>
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
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import array from 'src/mixins/array_mixin';
import DataService from 'src/services/DataService';
export default {
  mixins: [array],
  data() {
    return {
      latest_slide: 1,
      lists: []
    };
  },
  mounted() {
    DataService.get('data/newArrival.json')
      .then(response => {
        this.lists = this.chunk(response.data, 6);
      })
      .catch(error => {
        console.log('mixin/ddlb Error', error);
      });
  }
};
</script>

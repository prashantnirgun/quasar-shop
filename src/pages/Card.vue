<template>
  <div id="parent" class="row wrap justify-evenly" style="overflow: hidden;">
    <div
      class="col-xs-12 col-sm-6 col-md-3 q-pa-sm"
      v-for="data in lists"
      :key="data.product_id"
    >
      <q-card>
        <q-img :src="data.image_filename" />
        <q-card-section class="q-pb-xs q-pt-md">
          <div class="row no-wrap items-center">
            <div class="col text-subtitle2 ellipsis-2-lines text-grey-10">
              {{ data.product_name }}
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            ></div>
          </div>

          <q-rating
            v-model="stars"
            color="orange"
            :max="5"
            readonly
            size="17px"
          ></q-rating>
        </q-card-section>

        <q-card-section class="q-py-sm">
          <div>
            <div class="text-caption text-green-8 text-weight-bolder">
              Special Price
            </div>
            <span class="text-h6">₹3,149</span
            ><span
              class="q-ml-sm text-grey-6"
              style="text-decoration: line-through"
              >₹{{ data.rate }}</span
            >
            <span
              class="q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md"
              >20% off</span
            >
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            flat
            class="text-weight-bold text-capitalize"
            dense
            color="primary"
          >
            View details
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  data() {
    return {
      stars: 4,
      class_val: 'shadow-1 my-card',
      lists: []
    };
  },
  computed: {
    getSize() {
      return this.isDesktop ? '200px' : '300px';
    }
  },
  mounted() {
    const category_id = 1;
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        this.lists = response.data.filter(
          row =>
            parseInt(row.category_id) === category_id &&
            parseInt(row.primary_product_id) === 0
        );
        //console.log('data', this.lists, response.data);
        //console.timeEnd('Timer name');
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

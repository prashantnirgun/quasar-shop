<template>
  <q-table title="Treats" :data="lists" hide-header row-key="name" grid>
    <template v-slot:top="props">
      <q-btn
        flat
        round
        dense
        :icon="horizontal ? 'list' : 'grid_on'"
        @click="horizontal = !horizontal"
        v-if="!props.inFullscreen"
      >
      </q-btn>
    </template>
    <template v-slot:item="props">
      <q-card :class="outer">
        <div>
          <div class="row wrap">
            <div :class="[horizontal ? 'col-4' : 'col-12']">
              <img :src="props.row.image_filename" />
            </div>
            <div :class="[horizontal ? 'col-8' : 'col-12']">
              <div class="">
                {{ props.row.product_name }}
              </div>
              <div :class="[!horizontal ? 'hidden' : 'row']">
                <div class="col-4">Info</div>
                <div class="col-4">Label</div>
                <div class="col-4">Rate</div>
              </div>
            </div>
          </div>
          <div :class="{ hidden: !!horizontal }">
            Verticle product info
          </div>
          <div>
            call for Action
          </div>
        </div>
      </q-card>
    </template>
  </q-table>
</template>

<script>
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  data() {
    return {
      stars: 4,
      mode: 'list',
      horizontal: false,
      loading: true,
      class_val: 'shadow-1 my-card',
      lists: [],
      variety: 1,
      options: [1, 2, 3]
    };
  },
  computed: {
    getSize() {
      return this.horizontal ? '30%' : '400px';
    },
    getClass() {
      return (
        'q-pa-xs col-xs-12 col-sm-12 ' +
        (!!this.horizontal ? 'hr col-lg-6 col-md-6' : 'vr col-lg-3 col-md-3')
      );
    },
    outer() {
      let c =
        '' +
        (!!this.isDesktop ? (!!this.horizontal ? 'col-3' : 'col-3') : 'col-12');
      console.log('class', this.isDesktop, this.horizontal, c);
      return c;
    }
  },
  mounted() {
    const category_id = parseInt(this.$route.params.category_id);
    //this.$q.loading.show();
    //console.time('Timer name');
    DataService.get('data/product.json')
      .then(response => {
        this.lists = response.data.filter(
          row => parseInt(row.category_id) === category_id

          // && parseInt(row.primary_product_id) === 0
        );
        this.loading = false;
        //this.$q.loading.hide();
        console.log('data', this.lists);
        //console.timeEnd('Timer name');
      })
      .catch(error => {
        console.log('DataService.get Error', error);
      });
  }
};
</script>

<style lang="sass" scoped>
.veg-food
  border : 1px solid #6dad5c
  font-size: 8px
  display: inline-block
  width: 18px
  height: 17px !important

.border
  border : 1px solid #6dad5c

div
  border : 1px solid #6dad5c

img
    max-width: 100%
    max-height: 100%
</style>

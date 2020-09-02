<template>
  <q-dialog v-model="show" persistent position="top">
    <q-card style="min-width: 30vw">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Filter</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>

      <q-card-section>
       
        <q-item>
          <q-item-section>
            Price Range
            <div class="row wrap">
              <div v-for="price in selected_range" :key="price.name">
              <q-checkbox v-if="price.counter > 0" v-model="price.apply"  class="col-4"           
              @input="applyFilter"
              :disable="price.disable">{{price.name}} ({{price.counter}}) 
              </q-checkbox>
              </div>
            </div>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            Packing
            <div class="row wrap">
              <q-checkbox v-model="packing.apply" v-for="packing in selected_packings" :key="packing.size" 
              @input="applyFilter"> {{ packing.size}} {{ packing.unit_name}} 
              </q-checkbox>
            </div>
          </q-item-section>
        </q-item>

        <q-item>
          <!-- <q-item-section> -->
           <q-item-section>
            Offer
            <div  class="row wrap">
            <div
              v-for="(offer, index) in selected_offers"
              :key="index"
             
            >
              <q-toggle
                v-model="offer.apply"
                :label="offer.name"
                :val="offer.name"
                class="col-4"
                @input="applyFilter"
              />
            </div>
            </div>
          <!-- </q-item-section> -->
           </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['show', 'offers', 'price_range', 'packings'],
  data() {
    return {
      standard: {
        min: 250,
        max: 2500,
        step: 250
      },
      min: 0,
      max: 0,
      teal: true,
      orange: false,
      red: false,
      cyan: true,
      sale: true,
      arrival: false,
      selected_offers: this.offers,
      selected_range : this.price_range,
      selected_packings : this.packings
    };
  },
  watch :{    
    offers: {
       deep: true,
      handler(oldVal, newVal){
        //console.log('offer is changed', oldVal, newVal)
      this.applyFilter()
    }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    offerSelected(abc) {
      //console.log('selected option', abc);
      this.$emit('offerUpdate', this.myOffer);
    },
    applyFilter(){
      let payload = {}
      payload.rates = this.selected_range.filter(rate=> rate.apply)
      payload.size = this.selected_packings.filter(packing=> packing.apply)
      payload.offers = this.selected_offers.filter(offer=> offer.apply)
      //console.log('inside appllyfilter', payload)
      this.$emit('applyFilter', payload)
    }
  },
  computed: {},
  mounted() {
    this.standard = this.options;
    //console.log('product_filter/mounted', this.options, this.selected_range);
  }
};
</script>

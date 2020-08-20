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
          Price Range
        </q-item>
        <q-item>
          <!-- <q-item-section avatar>
           
          </q-item-section> -->

          <q-item-section>
            <q-range
              v-model="standard"
              :min="options.min"
              :max="options.max"
              @input="$emit('rangeUpdate', $event)"
              drag-range
              label
              markers
              color="purple"
              label-always
              :left-label-value="'Rs ' + standard.min + ' Rs'"
              :right-label-value="'Rs ' + standard.max + ' Rs'"
            />
          </q-item-section>
        </q-item>
        <!-- <q-item>
          
          <q-input
            dense
            outlined
            v-model.number="standard.min"
            label="Minimum"
          />
          <q-input
            dense
            outlined
            v-model.number="standard.max"
            label="Maximum"
          />
          
        </q-item> -->

        <!-- <q-item>
          <q-item-section>
            discount

            <div class="q-gutter-sm">
              <q-checkbox v-model="teal" label="Rs 250 - Rs 500" color="teal" />
              <q-checkbox
                v-model="orange"
                label="Rs 500 - Rs 750"
                color="orange"
              />
              <q-checkbox v-model="red" label="Rs 750 - Rs 1000" color="red" />
              <q-checkbox
                v-model="cyan"
                label="Rs 1000 - Rs 2500"
                color="cyan"
              />
            </div>
          </q-item-section>
        </q-item> -->

        <q-item>
          <q-item-section>
            Packing

            <div class="q-gutter-sm">
              <q-checkbox v-model="teal" label="1 KG" color="teal" />

              <q-checkbox v-model="red" label="5 KG" color="red" />
              <q-checkbox v-model="cyan" label="15 KG" color="cyan" />
            </div>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            Offer

            <div
              class="row q-gutter-sm"
              v-for="(offer, index) in options.offers"
              :key="index"
            >
              <q-toggle
                v-model="myOffer"
                :label="offer"
                :val="offer"
                @input="offerSelected"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['show', 'options'],
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
      myOffer: []
    };
  },

  methods: {
    close() {
      this.$emit('close');
    },
    offerSelected(abc) {
      //console.log('selected option', abc);
      this.$emit('offerUpdate', this.myOffer);
    }
  },
  computed: {},
  mounted() {
    this.standard = this.options;
    console.log('product_filter/mounted', this.options);
  }
};
</script>

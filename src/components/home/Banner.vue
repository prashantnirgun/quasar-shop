<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <div
        class="flex row justify-between items-center bg"
        :style="{
          backgroundImage: `url(${image_filename})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: `${getHeight}`
        }"
      >
        <!-- <img :src="image_filename" :height="getHeight" width="100%" /> -->
        <q-btn
          flat
          round
          icon="chevron_left"
          size="lg"
          class=""
          @click="skipSlide('decrement')"
        />
        <q-btn
          flat
          round
          icon="chevron_right"
          size="lg"
          class=""
          @click="skipSlide('increment')"
        />
      </div>
      <!-- <div v-for="slide in data" :key="slide.banner_id">
        <q-img :src="slide.image_filename" />
      </div> -->
      <!-- <q-carousel
        v-model="slideName"
        arrows
        swipeable
        animated
        autoplay
        infinite
        :height="getHeight"
      >
       
        <q-carousel-slide
          v-for="slide in data"
          :key="slide.banner_id"
          :name="slide.banner_id"
          :img-src="slide.image_filename"
          class="uncropped-image"
        >
        </q-carousel-slide> 
      </q-carousel> -->
    </div>
  </div>
</template>
<script>
//import slide from 'src/config/slider.json';
import DataService from 'src/services/DataService';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  data() {
    return {
      slideName: '1',
      counter: 1,
      rows: 0,
      data: [],
      image_filename: 'https://api.cloudapmc.com/banner/1/carousel_image_4.jpg',
      myTimer: ''
    };
  },
  methods: {
    getData() {
      DataService.get(`banner?total_rows=true`).then(response => {
        //console.log('banner got data', response.data.rows);
        this.data = response.data.rows;
        this.rows = this.data.length;
        this.image_filename = this.data[0].image_filename;
        this.myTimer = setTimeout(() => {
          this.timmer();
        }, 3000);
        //this.timmer();
      });
    },
    skipSlide(direction) {
      //console.log('data before', this.counter, direction, this.image_filename);
      if (direction === 'increment') {
        this.counter = this.counter < this.rows - 1 ? this.counter + 1 : 0;
      } else {
        this.counter = this.counter > 0 ? this.counter - 1 : this.rows - 1;
      }

      this.image_filename = this.data[this.counter].image_filename;
      //console.log('data after', this.counter, this.image_filename);
    }, //
    timmer() {
      clearInterval(this.myTimer);
      setInterval(() => {
        this.image_filename = this.data[this.counter].image_filename;

        this.counter = this.counter < this.rows - 1 ? this.counter + 1 : 0;
        //console.log('inside timer', this.counter);
      }, 3000);
    }
  },
  computed: {
    getHeight() {
      return this.isDesktop ? '300px' : '200px';
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.bg {
  display: flex;
  -webkit-transition: background-image 0.2s ease-in-out;
  transition: background-image 0.2s ease-in-out;
}
</style>

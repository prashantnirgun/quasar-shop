<template>
  <div class="row">
    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
      <q-carousel
        v-model="slide"
        arrows
        swipeable
        animated
        autoplay
        infinite
        :height="getHeight"
      >
        <q-carousel-slide
          v-for="slide in data"
          :key="slide.name"
          :name="slide.name"
          :img-src="slide.img"
        >
          <!-- <div class="absolute-bottom custom-caption">
            <div
              v-bind:class="caption.class"
              v-for="caption in slide.captions"
              :key="caption.text"
            >
              {{ caption.text }}
            </div>
          </div> -->
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>
<script>
import slide from 'src/config/slider.json';
import device_mixin from 'src/mixins/device_mixin';

export default {
  mixins: [device_mixin],
  data() {
    return {
      slide: 'first',
      data: slide
    };
  },
  computed: {
    getHeight() {
      return this.isDesktop ? '250px' : '230px';
    }
  },
  mounted() {
    console.log('slider', this.data);
  }
};
</script>

<style scoped>
.custom-caption {
  text-align: center
  padding: 8px
  color: white
  background-color: rgba(0, 0, 0, 0.3)
}
</style>

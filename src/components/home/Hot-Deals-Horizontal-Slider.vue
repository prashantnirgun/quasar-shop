<template>
  <div class="col-12 q-mt-sm">
    <div class="q-pl-md bg-white q-pt-sm ">
      <span class="text-grey-9 text-h6 text-weight-bold">Hot Deal</span>
      <a class="text-primary q-ml-sm cursor-pointer">[see all]</a>
    </div>
    <q-carousel
      v-model="trending_slide"
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
        v-for="val in [1, 2, 3]"
        :name="val"
        :key="val"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            @click="$router.push('/category')"
            style="border:1px solid lightgrey;"
            class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
            src="https://www.graphicsprings.com/filestorage/stencils/1cdf3eae16b6d0da3f16ff12f7650a24.png"
          >
            <div
              class="absolute-bottom custom-caption"
              style="background-color:rgba(0, 0, 0, .5);"
            >
              <div class="text-caption text-weight-bolder">
                Electronics
              </div>
            </div>
          </q-img>

          <!-- <q-img
            @click="$router.push('/category')"
            style="border:1px solid lightgrey;"
            class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
            src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
          >
            <div
              class="absolute-bottom custom-caption"
              style="background-color:rgba(0, 0, 0, .5);"
            >
              <div class="text-caption text-weight-bolder">
                TVs and Appliances
              </div>
            </div>
          </q-img>
          <q-img
            @click="$router.push('/category')"
            style="border:1px solid lightgrey;"
            class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
            src="https://www.graphicsprings.com/filestorage/stencils/1cdf3eae16b6d0da3f16ff12f7650a24.png"
          >
            <div
              class="absolute-bottom custom-caption"
              style="background-color:rgba(0, 0, 0, .5);"
            >
              <div class="text-caption text-weight-bolder">Men</div>
            </div>
          </q-img>
          <q-img
            @click="$router.push('/category')"
            style="border:1px solid lightgrey;"
            class="rounded-borders col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
            src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
          >
            <div
              class="absolute-bottom custom-caption"
              style="background-color:rgba(0, 0, 0, .5);"
            >
              <div class="text-caption text-weight-bolder">Women</div>
            </div>
          </q-img> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      trending_slide: 1
    };
  }
};
</script>

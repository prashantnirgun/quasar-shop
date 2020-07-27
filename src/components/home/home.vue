<template>
  <q-page class="q-mt-sm">
    <banner />
    <div class="text-grey-9 text-weight-bold">
      <div class="row items-center q-mx-sm">
        <hot-deals />
      </div>
      <div class="row items-center q-mx-sm">
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mt-sm">
          <div class="q-pl-md bg-white q-pt-sm">
            <span class="text-grey-9 text-h6 text-weight-bold"
              >Trending in</span
            >
            <a class="text-primary q-ml-sm cursor-pointer">[see more]</a>
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
                </q-img>
              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
      <div class="row q-mt-sm q-mx-sm bg-white text-center">
        <div
          class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
          style="border-right: 1px solid lightgrey"
        ></div>
        <div
          class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
          style="border-right: 1px solid lightgrey"
        >
          <q-img
            src="https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png"
          ></q-img>
          <div class="text-subtitle1 q-mb-sm text-grey-8">
            100% Secure Payments
          </div>
        </div>
        <div
          class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
          style="border-right: 1px solid lightgrey"
        >
          <q-img
            src="https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png"
          ></q-img>
          <div class="text-subtitle1 q-mb-sm text-grey-8">Trustpay</div>
        </div>
        <div
          class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
          style="border-right: 1px solid lightgrey"
        >
          <q-img
            src="https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png"
          ></q-img>
          <div class="text-subtitle1 q-mb-sm text-grey-8">Help Center</div>
        </div>
        <div
          class="col-lg-2 col-md-2 col-sm-12 col-xs-12"
          style="border-right: 1px solid lightgrey"
        >
          <q-img
            src="https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png"
          ></q-img>
          <div class="text-subtitle1 q-mb-sm text-grey-8">Shop On The Go</div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue';

export default {
  components: {
    banner: () => import('components/home/Banner'),
    'hot-deals': () => import('components/home/Hot-deals')
  },
  data() {
    return {
      trending_slide: 1
      //latest_slide: 1
    };
  },
  methods: {}
};
</script>

<style scoped></style>

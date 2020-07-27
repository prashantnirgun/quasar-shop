<template>
  <div class="col-12 q-mt-sm">
    <div class="q-pl-md bg-white q-pt-sm ">
      <span class="text-grey-9 text-h6 text-weight-bold">Latest Launches</span>
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
        v-for="val in [1, 2, 3]"
        :name="val"
        :key="val"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div>

          <!-- <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div>
          <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div>
          <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div>
          <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div>
          <div
            @click="$router.push('/details')"
            class="col-lg-2 col-md-2 col-sm-12 col-xs-12 hover_border_grey text-center full-height"
          >
            <q-img
              style=""
              class="rounded-borders"
              src="https://www.graphicsprings.com/filestorage/stencils/d3dd5cb632e0826d9e6136af3241b28e.png"
            >
            </q-img>
            <div>Redmi 8</div>
            <div class="text-caption text-weight-bold text-green">
              5000h mAh Battery
            </div>
            <div>
              <span>₹8,499</span
              ><span
                class="q-ml-sm text-grey-6"
                style="text-decoration: line-through"
                >₹10,999</span
              >
            </div>
          </div> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      latest_slide: 1
    };
  }
};
</script>

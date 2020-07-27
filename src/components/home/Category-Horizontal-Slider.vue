<template>
  <div class="col-12 q-mt-sm">
    <div class="q-pl-md bg-white q-pt-sm ">
      <span class="text-grey-9 text-h6 text-weight-bold">Category</span>
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
        v-for="(rows, index) in lists"
        :name="index"
        :key="index"
        class="column no-wrap"
      >
        <div
          class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
        >
          <q-img
            v-for="row in rows"
            :key="row.category_id"
            @click="$router.push('/category')"
            style="border:1px solid lightgrey;"
            class="rounded-borders col-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 cursor-pointer full-height"
            :src="row.image_filename"
          >
            <div
              class="absolute-bottom custom-caption"
              style="background-color:rgba(0, 0, 0, .5);"
            >
              <div class="text-caption text-weight-bolder">
                {{ row.category_name }}
              </div>
            </div>
          </q-img>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>
<script>
import array from 'src/mixins/array_mixin';
export default {
  mixins: [array],
  data() {
    return {
      trending_slide: 1,
      lists: []
    };
  },
  mounted() {
    this.$axios
      .get('http://localhost:8080/data/category.json')
      .then(result => {
        this.lists = this.chunk(result.data, 4);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

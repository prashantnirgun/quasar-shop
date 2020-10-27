<template>
  <q-list bordered separator class="q-mr-md">
    <q-item
      clickable
      v-ripple
      v-for="category in categoryList"
      :key="category.category_id"
      @click="setCurrentCategoryDisplay(category.category_id)"
      :active="link === category.category_id"
      active-class="bg-yellow"
    >
      <q-item-section>
        <q-item-label>{{ category.category_name }} </q-item-label>
        <q-item-label caption
          >Total
          {{ category.totalAmount | currency }}
        </q-item-label>
        <q-item-label overline
          >Your Saving
          {{ category.totalSaving | currency }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn dense color="purple" round icon="shopping_cart">
          <q-badge class="text-bold" floating transparent>
            {{ category.totalItem }}
          </q-badge>
        </q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import bus from 'src/boot/events';

export default {
  data() {
    return {
      link: 0
    };
  },
  computed: {
    ...mapGetters('cart', ['categoryList'])
  },
  methods: {
    ...mapActions('cart', ['setCurrentCategoryDisplay'])
    // categorySet(category_id) {
    //   this.link = category_id;
    //   console.log('inside cartCategory categorySet()', this.link);
    //   //this.$emit('categorySelected', category_id);
    //   //bus.$emit('vue_event_testing');
    // }
  },
  mounted() {
    //console.log('category list mounted', this.categoryList);
    this.link = this.categoryList[0].category_id;
    if (this.categoryList.length > 0) {
      console.log('inside cartCategory mounted sending request===>', this.link);
      this.setCurrentCategoryDisplay(this.link);

      bus.$emit('update_product_cart', this.link);
      //this.$emit('categorySelected', this.link);
    }
  },
  updated() {
    //console.log('inside cartCategory updated Event', this.link);
    //this.$emit('categorySelected', this.link);
    //bus.$emit('update_product_cart', this.link);
    //this.$ref.productList.foo();
  }
};
</script>

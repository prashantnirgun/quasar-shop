<template>
  <q-list bordered separator class="q-mr-md">
    <q-item
      clickable
      v-ripple
      v-for="category in categoryList"
      :key="category.category_id"
      @click="categorySet(category)"
      :active="currentItem.category_id === category.category_id"
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
      currentItem: 0
    };
  },
  watch: {
    categoryList() {
      console.log(
        'inside categoyrList watcher',
        this.categoryList,
        this.categoryList.length
      );

      if (this.categoryList.length > 0) {
        this.setCurrent(this.categoryList);
        //this.currentItem = this.categoryList[0].category_id;
        console.log(
          'inside cartCategory watcher sending request===>',
          this.currentItem
        );
        this.setCurrentCategoryDisplay({
          category_id: this.currentItem.category_id,
          totalItem: this.currentItem.totalItem
        });
      } else {
        console.log('no items left in cart going back to home');
        this.$q.notify({
          type: 'warning',
          message: 'Cart is empty going back to home'
        });
        this.$router.push({ name: 'home' });
      }
    }
  },
  computed: {
    ...mapGetters('cart', ['categoryList'])
  },
  methods: {
    setCurrent() {
      console.log('iside setCurrent', this.categoryList, this.currentItem);
      const found = this.categoryList.find(
        item => item.category_id === this.currentItem.category_id
      );
      console.log('category was found', found, !!found);
      if (!!found) {
        this.currentItem = found;
      } else {
        this.currentItem = this.categoryList[0];
        // this.setCurrentCategoryDisplay({
        //   category_id: this.currentItem.category_id,
        //   totalItem: this.currentItem.totalItem
        // });
      }
    },
    ...mapActions('cart', ['setCurrentCategoryDisplay']),
    categorySet(current) {
      this.currentItem = {
        category_id: current.category_id,
        totalItem: current.totalItem
      };
      this.setCurrentCategoryDisplay(this.currentItem);
      console.log(
        'inside cartCategory categorySet()',
        this.currentItem,
        current
      );
      //this.$emit('categorySelected', category_id);
      //bus.$emit('vue_event_testing');
    }
  },
  mounted() {
    //console.log('category list mounted', this.categoryList);
    this.currentItem = this.categoryList[0];
    if (this.categoryList.length > 0) {
      // console.log(
      //   'inside cartCategory mounted sending request===>',
      //   this.currentItem
      // );
      this.setCurrentCategoryDisplay({
        category_id: this.currentItem.category_id,
        totalItem: this.currentItem.totalItem
      });

      //bus.$emit('update_product_cart', this.currentItem);
      //this.$emit('categorySelected', this.currentItem);
    }
  },
  updated() {
    //console.log('inside cartCategory updated Event', this.currentItem);
    //this.$emit('categorySelected', this.currentItem);
    //bus.$emit('update_product_cart', this.currentItem);
    //this.$ref.productList.foo();
  }
};
</script>

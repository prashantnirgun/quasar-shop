<template>
  <div class="bg-white text-grey-9 text-weight-bold shadow-transition">
    <div
      class="row text-center items-center"
      :style="$q.platform.is.desktop ? 'height: 38px' : ''"
    >
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
        @mouseover="menu_cat_elc = true"
      >
        Electronics
        <q-menu
          fit
          @mouseleave="menu_cat_elc = false"
          v-model="menu_cat_elc"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list dense class="text-grey-9 text-caption">
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Mobiles</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Laptops</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Health Care Appliances</q-item-section>
            </q-item>
            <!--<q-separator/>-->
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Speakers</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Smart Home Automation</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
          size="sm"
          class="q-ml-xs text-grey-5"
          name="keyboard_arrow_down"
        ></q-icon>
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
        @mouseover="menu_cat_tvs = true"
      >
        TVs and Appliances
        <q-menu
          fit
          @mouseleave="menu_cat_tvs = false"
          v-model="menu_cat_tvs"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list dense class="text-grey-9 text-caption">
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Television</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Air Conditioners</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Health Care Appliances</q-item-section>
            </q-item>
            <!--<q-separator/>-->
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Shop By Screen Size</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Smart Home Appliances</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
          size="sm"
          class="q-ml-xs text-grey-5"
          name="keyboard_arrow_down"
        ></q-icon>
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
        @mouseover="menu_cat_men = true"
      >
        Men
        <q-menu
          fit
          @mouseleave="menu_cat_men = false"
          v-model="menu_cat_men"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          <q-list dense class="text-grey-9 text-caption">
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Footwear</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Clothing</q-item-section>
            </q-item>
            <q-item @click="$router.push('/category')" clickable>
              <q-item-section>Sports & Fitness Store</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-icon
          size="sm"
          class="q-ml-xs text-grey-5"
          name="keyboard_arrow_down"
        ></q-icon>
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
      >
        Women
        <q-icon
          size="sm"
          class="q-ml-xs text-grey-5"
          name="keyboard_arrow_down"
        ></q-icon>
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
      >
        Home & Furniture
        <q-icon
          size="sm"
          class="q-ml-xs text-grey-5"
          name="keyboard_arrow_down"
        ></q-icon>
      </div>
      <div
        class="col-lg-2 col-md-2 col-sm-12 col-xs-12 cursor-pointer hover-blue"
      >
        Offers
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: false,
      menu_cat_elc: false,
      menu_cat_tvs: false,
      menu_cat_men: false,
      text: '',
      showPincode: false
    };
  }
};
</script>

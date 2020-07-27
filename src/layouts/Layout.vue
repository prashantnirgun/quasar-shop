<template>
  <q-layout view="lHh LpR lFf" style="font-family: Lato;"
    ><!-- 
    <q-header reveal elevated style="background-color: #1f509e;"> -->

    <q-header reveal elevated style="background-color: #1f509e;">
      <!-- <q-toolbar v-if="!$q.platform.is.desktop" class="q-py-sm">
        <div class="row">
          <div class="col-sm-12 col-xs-12">
            <q-toolbar-title>
              <img
                @click="$router.push('/home')"
                class="cursor-pointer float-left"
                src="/images/logo.png"
                style="width: 12%"
              />
              <span
                class="float-left q-mt-xs q-ml-md text-h6 text-weight-bold"
                style="font-size: 17px;"
              >
                {{ siteName }}
              </span>
            </q-toolbar-title>
          </div>
          <div class="col-sm-12 col-xs-12 q-mt-md">
            <q-input
              class="float-left q-mx-md full-width"
              bg-color="white"
              v-model="text"
              rounded
              outlined
              label="Search for products, brands and more..."
            />
          </div>
          <div class="col-sm-12 col-xs-12 q-mt-md">
            <div>
              <q-btn class="q-mr-md" dense round flat icon="shopping_cart">
                <q-badge color="red" class="text-bold" floating transparent>
                  4
                </q-badge>
              </q-btn>
              <q-btn flat round dense icon="settings" class="q-mr-md" />
              <q-btn flat round dense icon="fas fa-sign-out-alt" to="/" />
            </div>
          </div>
        </div>
      </q-toolbar> -->

      <q-toolbar v-if="$q.platform.is.desktop" class="q-py-sm">
        <img
          @click="$router.push('/home')"
          class="cursor-pointer"
          src="/images/logo.png"
          style="width: 38px"
        />
        <q-toolbar-title>
          <span
            class="float-left q-mt-xs text-h6 text-weight-bold"
            style="font-size: 17px;"
            >{{ siteName }}</span
          >
          <search-bar />
        </q-toolbar-title>

        <q-btn
          flat
          round
          dense
          icon="location_on"
          class="q-mr-md"
          @click="showPincode = true"
        />
        <q-btn class="q-mr-md" dense round flat icon="shopping_cart">
          <q-badge color="red" class="text-bold" floating transparent>
            4
          </q-badge>
        </q-btn>
        <q-btn flat round dense icon="settings" class="q-mr-md" />
        <q-btn flat round dense icon="fas fa-sign-out-alt" to="/" />
      </q-toolbar>
      <nav-bar />
    </q-header>

    <q-page-container style="background-color:#f1f2f6">
      <router-view />

      <site-footer />
    </q-page-container>
    <pincode :showPincode="showPincode" @close="showPincode = false" />
  </q-layout>
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
  },
  components: {
    'search-bar': () => import('src/layouts/SearchBar'),
    pincode: () => import('components/Pincode'),
    'site-footer': () => import('src/layouts/Footer'),
    'nav-bar': () => import('src/layouts/Menu')
  },
  computed: {
    siteName() {
      //console.log('site', `${process.env.SITE_NAME`);
      return process.env.SITE_NAME;
    }
  },
  mounted() {
    /* eslint-disable no-console */
    console.log(`Dotenv Test: (TEST: ${process.env.SITE_NAME})`);
  }
};
</script>

<style lang="scss" scoped>
.q-drawer {
  background-image: url('/statics/images/lake.jpg') !important;
  background-size: cover !important;
}
.q-drawer__content {
  background-color: rgba(1, 1, 1, 0.75);
}
.navigation-item {
  border-radius: 5px;
}
.tab-active {
  background-color: green;
}
.hover-blue {
  &:hover {
    color: #1f509e;
  }
}
.hover_underline_white {
  &:hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
}
.hover_border_grey {
  &:hover {
    border: 1px solid lightgrey;
    cursor: pointer;
    border-radius: 3px;
  }
}
</style>

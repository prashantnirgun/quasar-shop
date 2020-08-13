<template>
  <q-layout view="hHh LpR lFf" style="font-family: Lato;">
    <q-header reveal elevated style="background-color: #1f509e;">
      <!-- <q-header reveal elevated class="bg-green"> -->
      <q-toolbar class="q-py-sm">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          v-if="isMobile"
        />

        <img
          @click="$router.push('/')"
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
          <search-bar v-if="isDesktop" />
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
            {{ cartCount }}
          </q-badge>
          <mini-cart />
        </q-btn>
        <q-btn
          flat
          round
          dense
          icon="settings"
          class="q-mr-md"
          v-if="isDesktop"
        />
        <q-btn
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @mouseover="showing = true"
        >
          <q-menu
            v-model="showing"
            auto-close
            class="q-mt-none"
            @mouseleave="showing = false"
          >
            <q-list>
              <q-item clickable @click="showMenu1 = true">
                <q-item-section>
                  <q-item-label>Login</q-item-label>
                  <q-item-label caption
                    >Standard Login Dialog with image</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item clickable @click="showMenu2 = true">
                <q-item-section>
                  <q-item-label>Accordian</q-item-label>
                  <q-item-label caption>Accordian / Collapsiblee</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item clickable @click="showMenu3 = true">
                <q-item-section>
                  <q-item-label>Horizontal Tab</q-item-label>
                  <q-item-label caption
                    >Horizontal Tabs Login Dialog</q-item-label
                  >
                </q-item-section>
              </q-item>

              <q-separator spaced inset />

              <q-item clickable @click="showMenu4 = true">
                <q-item-section>
                  <q-item-label>Vertical Tab</q-item-label>
                  <q-item-label caption
                    >Vertical Tabs Login Dialog</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <desktop-menu v-if="isDesktop" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-ornage"
    >
      <q-list bordered class="rounded-borders">
        <Sidebar :model="root" depth="0" />
      </q-list>
    </q-drawer>

    <q-page-container style="background-color:#f1f2f6">
      <router-view />

      <site-footer />
    </q-page-container>
    <pincode :showPincode="showPincode" @close="showPincode = false" />
    <login1 :show="showMenu1" @close="close" />
    <login2 :show="showMenu2" @close="close" />
    <login3 :show="showMenu3" @close="close" />
    <login4 :show="showMenu4" @close="close" />
  </q-layout>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
import root from 'src/config/menu.json';
import { mapGetters } from 'vuex';

export default {
  mixins: [device_mixin],
  data() {
    return {
      showMenu1: false,
      showMenu2: false,
      showMenu3: false,
      showMenu4: false,
      showing: false,
      showPincode: false,
      leftDrawerOpen: false,
      root
    };
  },
  components: {
    'search-bar': () => import('src/layouts/SearchBar'),
    'mini-cart': () => import('components/cart/Mini_cart'),
    pincode: () => import('components/Pincode'),
    'site-footer': () => import('src/layouts/Footer'),
    'desktop-menu': () => import('src/layouts/DesktopMenu'),
    Sidebar: () => import('./Drawer'),
    login1: () => import('components/auth/login'),
    login2: () => import('components/auth/loginAccordian'),
    login3: () => import('components/auth/loginHorizontalTab'),
    login4: () => import('components/auth/loginVerticalTab')
  },
  methods: {
    close() {
      this.showMenu1 = false;
      this.showMenu2 = false;
      this.showMenu3 = false;
      this.showMenu4 = false;
    }
  },
  computed: {
    ...mapGetters('cart', ['cartCount']),
    siteName() {
      //console.log('site', `${process.env.SITE_NAME`);
      return process.env.SITE_NAME;
    }
  },
  mounted() {
    /* eslint-disable no-console */
    console.log(
      `Dotenv Test: (TEST: ${process.env.SITE_NAME}, ${process.env.NODE_ENV})`
    );
  },
  created() {
    //this.$q.addressbarColor.set('#228b22');
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

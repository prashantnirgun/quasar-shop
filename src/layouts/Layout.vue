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
          round
          v-if="!isUserLoggedIn"
          icon="input"
          @click="showMenu1 = true"
          class="q-mr-xs"
        />

        <q-btn v-if="isUserLoggedIn" flat icon="account_circle">
          <q-menu auto-close transition-show="scale" transition-hide="scale">
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img src="https://cdn.quasar.dev/img/avatar.png" />
                  <q-badge floating color="teal">new</q-badge>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ full_name }}</q-item-label>
                <q-item-label caption>2 new messages</q-item-label>
              </q-item-section>
            </q-item>

            <q-list style="min-width: 100px;">
              <q-item clickable>
                <q-item-section>Feedback</q-item-section>
              </q-item>
              <q-item> Version {{ version }} </q-item>
              <q-separator />
              <q-item clickable class="text-purple" @click="logout">
                <q-item-section>Logout</q-item-section>
                <q-icon name="cloud_off" size="md"></q-icon>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!--
        <q-btn
          v-if="isUserLoggedIn"
          flat
          round
          dense
          icon="fas fa-sign-out-alt"
          @click="showMenu1 = true"
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
        </q-btn>-->
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
import { mapState, mapGetters, mapActions } from 'vuex';

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
    ...mapActions('user', ['setToken', 'setUser']),
    close() {
      this.showMenu1 = false;
      this.showMenu2 = false;
      this.showMenu3 = false;
      this.showMenu4 = false;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      //this.$store.dispatch('setToken', null);
      //this.$store.dispatch('setUser', null);
      if (this.rememberMe === false) {
        localStorage.clear();
      } else {
        console.log('storage not cleared', this.rememberMe);
      }

      //this.$store.dispatch('setCompany', null);
      //Go to home page
      //this.$router.replace('/');
      this.$router.push({ name: 'home' }).catch(err => {});
    }
  },
  computed: {
    ...mapGetters('cart', ['cartCount']),
    ...mapGetters('user', ['user']),
    ...mapState(['isUserLoggedIn', 'version', 'rememberMe']),

    //...mapState(['isUserLoggedIn', 'version']),
    siteName() {
      //console.log('site', `${process.env.SITE_NAME`);
      return process.env.SITE_NAME;
    },
    full_name() {
      console.log('this.user', this.user);
      return !!this.user ? this.user.full_name : 'Guest';
    }
  },
  mounted() {
    /* eslint-disable no-console */
    console.log(
      `Dotenv Test: (TEST: ${process.env.SITE_NAME}, ${process.env.NODE_ENV})`,
      'version',
      this.version,
      'user',
      this.user,
      'isLogedIn',
      this.isUserLoggedIn
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

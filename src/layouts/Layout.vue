<template>
  <q-layout view="hHh LpR lFf" style="font-family: Lato;">
    <q-header reveal elevated style="background-color: #1f509e;">
      <!-- <q-header reveal elevated class="bg-green"> -->
      <q-toolbar class="">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          v-if="isMobile"
        />

        <q-img
          @click="$router.push('/')"
          class="cursor-pointer"
          src="/images/logo.png"
          style="width: 38px"
        >
          <tooltip>Home</tooltip>
        </q-img>

        <q-toolbar-title>
          <span
            class="float-left q-mt-xs text-h6 text-weight-bold"
            style="font-size: 17px;"
            >{{ siteName }}</span
          >
          <!-- <center>
            <search-bar v-if="isDesktop" />
          </center> -->
        </q-toolbar-title>

        <!-- <q-btn
          flat
          round
          dense
          icon="location_on"
          class="q-mr-md"
          @click="showPincode = true"
        >
          <tooltip>Set Area / Location for faster delivery</tooltip>
        </q-btn> -->
        <q-btn class="q-mr-md" dense round flat icon="shopping_cart">
          <q-badge color="red" class="text-bold" floating transparent>
            {{ cartCount }}
          </q-badge>
          <mini-cart />

          <tooltip>Show Mini Cart</tooltip>
        </q-btn>
        <!-- <q-btn
          flat
          round
          dense
          icon="settings"
          class="q-mr-md"
          v-if="isDesktop"
        >
          <tooltip>Settings</tooltip>
        </q-btn> -->
        <q-btn
          round
          v-if="!isUserLoggedIn"
          icon="fas fa-sign-in-alt"
          size="12px"
          @click="showMenu1 = true"
          class="q-mr-xs"
        >
          <tooltip>Login / Register</tooltip>
        </q-btn>

        <q-btn v-if="isUserLoggedIn" flat icon="account_circle">
          <q-menu auto-close transition-show="scale" transition-hide="scale">
            <q-item clickable v-ripple to="/profile">
              <q-item-section side>
                <q-avatar rounded size="48px">
                  <img :src="imgUrl" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ full_name }}</q-item-label>
                <q-item-label caption>Account</q-item-label>
              </q-item-section>
            </q-item>

            <q-list style="min-width: 100px;">
              <q-item dense clickable to="/shopping-cart/1">
                <q-item-section>Shopping Cart</q-item-section>
                <q-item-section avatar class="text-indigo">
                  <q-icon name="shopping_cart" color="purpul" size="md" />
                </q-item-section>
              </q-item>

              <q-item dense clickable to="/orders">
                <q-item-section class="text-black"
                  >Order History</q-item-section
                >
                <q-item-section avatar class="text-indigo">
                  <q-icon name="card_giftcard" size="md" />
                </q-item-section>
              </q-item>

              <!-- <q-item dense clickable to="profile">
                <q-item-section>Your Wish List</q-item-section>
                <q-item-section avatar class="text-purple">
                  <q-icon name="favorite" size="md" />
                </q-item-section>
              </q-item> -->

              <!-- <q-item>
                <q-item-section>Version {{ version }} </q-item-section>
                <q-item-section avatar>
                  <q-icon name="verified" size="md"></q-icon>
                </q-item-section>
              </q-item> -->
              <q-separator />
              <q-item clickable class="text-indigo" @click="logout">
                <q-item-section class="text-black">Logout</q-item-section>
                <q-icon name="fas fa-sign-out-alt" size="sm" />
              </q-item>
            </q-list>
          </q-menu>
          <tooltip>Account</tooltip>
        </q-btn>
      </q-toolbar>
      <desktop-menu v-if="isDesktop" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class=""
    >
      <q-list bordered class="rounded-borders">
        <q-item clickable v-ripple to="/profile" class="q-my-xs">
          <q-item-section side>
            <q-avatar rounded size="80px">
              <img :src="imgUrl" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6">{{ full_name }}</q-item-label>
            <q-item-label caption class="">Account</q-item-label>
          </q-item-section>
        </q-item>

        <Sidebar v-if="isMobile" :model="root" />

        <q-item v-if="isUserLoggedIn" clickable to="/orders">
          <q-item-section avatar class="">
            <q-icon name="receipt" size="md" />
          </q-item-section>
          <q-item-section class="text-weight-bold">
            Order History</q-item-section
          >
        </q-item>

        <q-separator />
        <q-item to="contact-us">
          <q-item-section avatar>
            <q-icon name="location_on" />
          </q-item-section>
          <q-item-section class="text-weight-bold">Contact Us</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container style="background-color:#f1f2f6" class="no-class">
      <!-- <keep-alive> -->
      <router-view :key="$route.fullPath" />
      <!-- </keep-alive> -->
      <!-- place QPageScroller at end of page -->
      <q-page-scroller
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="accent" />
      </q-page-scroller>
      <site-footer />
    </q-page-container>
    <!-- <pincode :showPincode="showPincode" @close="showPincode = false" /> -->
    <login1 :show="showMenu1" @close="close" />
    <!-- <login2 :show="showMenu2" @close="close" />
    <login3 :show="showMenu3" @close="close" />
    <login4 :show="showMenu4" @close="close" /> -->
  </q-layout>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
//import root from 'src/config/menu.json';
import { mapState, mapGetters, mapActions } from 'vuex';
import { LocalStorage, SessionStorage } from 'quasar';
export default {
  mixins: [device_mixin],
  data() {
    return {
      showMenu1: false,
      // showMenu2: false,
      // showMenu3: false,
      // showMenu4: false,
      showing: false,
      showPincode: false,
      leftDrawerOpen: false,
      root: this.sidebar
    };
  },
  components: {
    tooltip: () => import('components/BaseTooltip'),
    //'search-bar': () => import('src/layouts/SearchBar'),
    'mini-cart': () => import('components/cart/Mini_cart'),
    //pincode: () => import('components/Pincode'),
    'site-footer': () => import('src/layouts/Footer'),
    'desktop-menu': () => import('src/layouts/DesktopMenu'),
    Sidebar: () => import('./SideBar'),
    login1: () => import('components/auth/login')
  },
  watch: {
    loginPrompt(newVal) {
      console.log('loginPrompt changed to', newVal);
      if (newVal) {
        this.showMenu1 = true;
      }
    }
  },
  methods: {
    ...mapActions('user', ['setToken', 'setUser']),
    ...mapActions('cart', ['updateCustomerId', 'updateDeliveryAddress']),
    ...mapActions(['setLoginRequest']),
    close() {
      this.setLoginRequest(false);
      this.showMenu1 = false;
      // this.showMenu2 = false;
      // this.showMenu3 = false;
      // this.showMenu4 = false;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      this.updateCustomerId(0);
      this.updateDeliveryAddress({});
      //this.$store.dispatch('setToken', null);
      //this.$store.dispatch('setUser', null);
      if (this.rememberMe === false) {
        //localStorage.clear();
      } else {
        console.log('storage not cleared', this.rememberMe);
      }

      //this.$store.dispatch('setCompany', null);
      //Go to home page
      //this.$router.replace('/');
      this.$router.push({ name: 'home' }).catch(err => {});
      window.location.reload();
    }
  },
  computed: {
    ...mapGetters('cart', ['cartCount']),
    ...mapGetters('user', ['user']),
    ...mapGetters(['loginPrompt', 'sidebar']),
    ...mapState(['isUserLoggedIn', 'version', 'rememberMe', 'loginPrompt']),

    //...mapState(['isUserLoggedIn', 'version']),
    siteName() {
      //console.log('sitename', this.isDesktop, process.env.SITE_FULL_NAME);
      return this.isDesktop
        ? process.env.SITE_FULL_NAME
        : process.env.SITE_NAME;
    },
    full_name() {
      return !!this.user ? this.user.full_name : 'Guest';
    },
    imgUrl() {
      return process.env.NODE_ENV === 'production' &&
        !!this.user &&
        this.user.image_filename &&
        this.user.image_filename.length > 5
        ? `${process.env.STATIC}users/${this.user.company_id}/${this.user.image_filename}`
        : 'https://cdn.quasar.dev/img/boy-avatar.png';
    }
  },
  mounted() {
    //console.log('proptlogin', this.loginPrompt);
    /* eslint-disable no-console */
    /*
    console.log(
      `Dotenv Test: (TEST: ${process.env.SITE_NAME}, ${process.env.NODE_ENV})`,
      'sidebar',
      this.sidbar
    );
    */
  },
  created() {
    this.root = this.sidebar;
    //console.log('inside layout cread', this.root);
    //this.$q.addressbarColor.set('#228b22');
  }
};
</script>

<style lang="scss" scoped>
.q-drawer {
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
  }
}
.hover_border_grey {
  &:hover {
    border: 1px solid lightgrey;
  }
}
</style>

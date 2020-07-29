<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 400px">
      <q-card-section class="row">
        <div class="text-h6">Welcome {{ siteName }}</div>
        <q-space />
        <q-btn dense icon="fas fa-times" flat @click="close" />
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list bordered>
          <q-expansion-item
            group="somegroup"
            icon="fas fa-sign-out-alt"
            label="Sign In"
            default-opened
            v-model="signin"
            @hide="signup = true"
            header-class="bg-teal-6 text-white text-h6"
          >
            <q-card>
              <q-card-section>
                <q-input
                  class="q-ma-sm"
                  outlined
                  v-model="username"
                  label="Username"
                  lazy-rules
                />

                <q-input
                  class="q-ma-sm"
                  type="password"
                  outlined
                  v-model="password"
                  label="Password"
                  lazy-rules
                />

                <q-btn
                  class="q-ma-sm text-capitalize"
                  label="Login"
                  @click="close"
                  color="info"
                  size="lg"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item
            group="somegroup"
            icon="how_to_reg"
            label="Sign Up"
            ref="two"
            header-class="bg-teal-4 text-white text-h6"
            @hide="signin = show"
            v-model="signup"
          >
            <q-card>
              <q-card-section>
                <q-input
                  class="q-ma-sm"
                  outlined
                  label="Full Name"
                  lazy-rules
                />

                <q-input class="q-ma-sm" outlined label="Username" lazy-rules />

                <q-input
                  class="q-ma-sm"
                  type="password"
                  outlined
                  label="Password"
                  lazy-rules
                />

                <q-btn
                  class="flat q-ma-sm text-capitalize"
                  label="Register"
                  @click="close"
                  color="info"
                  size="lg"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card-section>
      <!-- </q-card-section> -->
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['show', 'closeAction'],
  data() {
    return {
      username: 'admin',
      password: 'admin',
      remember_me: false,
      signin: true,
      signup: false
    };
  },

  methods: {
    close(payload) {
      this.$emit('close');
    },
    doit(val) {
      console.log('val', val);
      //   this.signin = false;
      //   this.signup = true;
      //this.$refs.two.show();
    }
  },
  computed: {
    siteName() {
      return process.env.SITE_NAME;
    }
  }
};
</script>

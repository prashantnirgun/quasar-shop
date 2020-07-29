<template>
  <q-dialog v-model="show" persistent>
    <div class="bg-white" style="width: 700px;">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Welcome {{ siteName }}</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="close" />
        </q-card-section>
      </q-card>

      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal bg-white"
            align="justify"
          >
            <q-tab
              name="mails"
              icon="fas fa-sign-out-alt"
              label="Login"
              class="text-purple"
            />
            <q-tab
              name="alarms"
              icon="fas fa-users"
              label="Register"
              class="text-orange"
            />
            <q-tab
              name="movies"
              icon="movie"
              label="About Us"
              class="text-teal"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="mails">
              <div class="text-h4 q-mb-md text-purple">Mails</div>
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
                color="purple"
                size="lg"
              />
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h4 q-mb-md text-orange">Register</div>
              <q-input class="q-ma-sm" outlined label="Full Name" lazy-rules />

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
                color="orange"
                size="lg"
              />
            </q-tab-panel>

            <q-tab-panel name="movies">
              <div class="text-h4 q-mb-md text-teal">About Us</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
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
      tab: 'mails',
      splitterModel: 20
    };
  },

  methods: {
    close(payload) {
      this.$emit('close');
    }
  },
  computed: {
    siteName() {
      return process.env.SITE_NAME;
    }
  }
};
</script>

<template>
  <q-dialog v-model="show" persistent>
    <div class="bg-white" style="width: 400px;">
      <q-card class="q-ma-sm" style="height: 400px;">
        <q-tabs v-model="tab" class="bg-primary text-white shadow-2">
          <q-tab name="mails" icon="fas fa-sign-out-alt" label="Login" />
          <q-tab name="alarms" icon="fas fa-users" label="Register" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated swipeable horizontal>
          <q-tab-panel name="mails">
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
              color="primary"
              size="lg"
            />

            <q-btn
              class="q-ma-sm text-capitalize float-right"
              label="close"
              @click="close"
              color="danger-orange"
              size="lg"
            />
          </q-tab-panel>

          <q-tab-panel name="alarms">
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
        </q-tab-panels>
      </q-card>
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

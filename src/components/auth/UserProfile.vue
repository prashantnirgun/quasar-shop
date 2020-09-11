<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">US Region</div>
              <div class="text-h5 q-mt-sm q-mb-xs">Mayur Patel</div>
              <div class="text-caption text-grey">
                Sales and Marketing Executive | Graduate and past committee |
                Keynote speaker on Selling and Recruiting Topics
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/boy-avatar.png"
              />
            </q-card-section>
          </q-card-section>

          <!-- <q-separator />

          <q-card-section>
            Assessing clients needs and present suitable promoted products.
            Liaising with and persuading targeted doctors to prescribe our
            products utilizing effective sales skills.
          </q-card-section> -->
        </q-card>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-mt-sm">
          <q-card class="my-card" flat bordered>
            <q-card-section class="text-h6 q-pa-sm">
              <div class="text-h6">Change Password</div>
            </q-card-section>
            <q-card-section class="q-pa-sm row">
              <q-item class="col-12">
                <q-item-section>
                  <q-input
                    type="password"
                    dense
                    outlined
                    v-model="password_dict.current_password"
                    label="Current Password"
                  />
                </q-item-section>
              </q-item>

              <q-item class="col-12">
                <q-item-section>
                  <q-input
                    v-model="password_dict.password"
                    outlined
                    dense
                    label="New Password"
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>

              <q-item class="col-12">
                <q-item-section>
                  <q-input
                    type="password"
                    dense
                    outlined
                    v-model="password_dict.confirm_new_password"
                    label="Confirm New Password"
                  />
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-capitalize" color="primary"
                >Change Password</q-btn
              >
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                outlined
                dense
                v-model="user.first_name"
                label="Full Name"
                lazy-rules
              />
              <div class="row">
                <q-input
                  outlined
                  dense
                  v-model="user.last_name"
                  label="Gender"
                  lazy-rules
                  class="col-6 q-pr-xs"
                />

                <q-input
                  dense
                  outlined
                  v-model="user.dob"
                  mask="date"
                  :rules="['date']"
                  class="col-6 q-pa-xs"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="date">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="row">
                <q-input
                  outlined
                  dense
                  v-model="user.email"
                  label="Register Email"
                  lazy-rules
                  class="col-6 q-pr-xs"
                />
                <q-input
                  outlined
                  dense
                  v-model="user.phone"
                  label="Phone"
                  lazy-rules
                  class="col-6"
                />
              </div>
              <q-input
                outlined
                dense
                v-model="user.email"
                label="Google"
                lazy-rules
              />
              <q-input
                outlined
                dense
                v-model="user.email"
                label="Facebook"
                lazy-rules
              />
              <q-input
                outlined
                dense
                v-model="user.email"
                label="LinkedIn"
                lazy-rules
              />

              <div align="right">
                <q-btn
                  dense
                  label="Update"
                  type="submit"
                  color="primary"
                  class="text-capitalize"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      user: {
        first_name: 'Mayur',
        last_name: 'Patel',
        age: 30,
        email: 'm******@****.com',
        phone: '97******92',
        dob: '2020/01/01'
      },
      password_dict: {},
      isPwd: true
    };
  }
};
</script>

<style scoped></style>

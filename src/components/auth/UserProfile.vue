<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">US Region</div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                {{ data.user.full_name }}
              </div>
              <div class="text-caption text-grey">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto asperiores debitis officiis deserunt voluptate. Neque
                a veritatis quo optio temporibus consectetur adipisci esse
                deserunt, excepturi quasi velit totam ab unde.
              </div>
            </q-card-section>
            <q-card-section
              class="col-5 flex flex-center cursor-pointer"
              @click="selectFile"
            >
              <q-avatar :size="getImageSize">
                <q-img
                  class="rounded-borders"
                  :src="imgUrl"
                  @mouseover="mouseOver = true"
                  @mouseleave="mouseOver = false"
                >
                  <div
                    class="absolute-bottom text-subtitle1 text-center"
                    v-if="mouseOver"
                  >
                    Upload
                  </div>
                </q-img>
              </q-avatar>
              <q-file
                v-show="false"
                ref="file_upload"
                @input="uploadFile"
                v-model="image_filename"
                accept=".jpg, image/*"
              />
            </q-card-section>
          </q-card-section>
        </q-card>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card class="my-card" flat bordered>
            <q-form class="q-gutter-md" @submit.prevent.stop="onUpdatePassword">
              <q-card-section class="text-h6 q-pa-sm">
                <div class="text-h6">Change Password</div>
              </q-card-section>
              <q-card-section class="q-pa-sm row">
                <q-item class="col-12">
                  <q-item-section>
                    <q-input
                      v-model="password.current"
                      outlined
                      dense
                      label="Current Password"
                      :type="isPwdCurrent ? 'password' : 'text'"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwdCurrent ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwdCurrent = !isPwdCurrent"
                        />
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item class="col-12">
                  <q-item-section>
                    <q-input
                      v-model="password.new"
                      outlined
                      dense
                      label="New Password"
                      :type="isPwdNew ? 'password' : 'text'"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwdNew ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwdNew = !isPwdNew"
                        />
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item class="col-12">
                  <q-item-section>
                    <q-input
                      v-model="password.confirm"
                      outlined
                      dense
                      label="Confirm Password"
                      :type="isPwdConfirm ? 'password' : 'text'"
                      :rules="[passwordRule]"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwdConfirm = !isPwdConfirm"
                        />
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  :disable="!passwordForm"
                  class="text-capitalize"
                  color="primary"
                  type="submit"
                  label="Change Password"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-mt-sm">
        <q-card>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent.stop="onSubmit">
              <q-input
                outlined
                dense
                v-model="data.user.full_name"
                label="Full Name"
                lazy-rules
              />
              <div class="row">
                <q-select
                  dense
                  outlined
                  v-model="data.user_profile.gender_id"
                  :options="genderOptions"
                  label="Gender"
                  emit-value
                  map-options
                  class="col-6"
                />

                <q-input
                  dense
                  outlined
                  v-model="data.user_profile.dob"
                  mask="##-##-####"
                  :rules="['isDateValid']"
                  class="col-6 q-pa-xs"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="data.user_profile.dob"
                          mask="DD-MM-YYYY"
                        >
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
                  v-model="data.user.email_id"
                  label="Register Email"
                  lazy-rules
                  class="col-6 q-pr-xs"
                />
                <q-input
                  outlined
                  dense
                  v-model="data.user.mobile"
                  label="Phone"
                  lazy-rules
                  class="col-6"
                />
              </div>
              <q-input
                outlined
                dense
                v-model="data.user_profile.gmail"
                label="Google"
                lazy-rules
              />
              <q-input
                outlined
                dense
                v-model="data.user_profile.facebook"
                label="Facebook"
                lazy-rules
              />
              <q-input
                outlined
                dense
                v-model="data.user_profile.linkedin"
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
import DataService from 'src/services/DataService';
import { date } from 'quasar';
import { mapGetters, mapActions } from 'vuex';
import common_mixin from 'src/mixins/common_mixin';
import device_mixin from 'src/mixins/device_mixin';
import { isDateValid } from 'src/services/Validation';

export default {
  mixins: [common_mixin, device_mixin],
  data() {
    return {
      data: {
        user: {},
        user_profile: {}
      },
      password: {
        new: null,
        current: null,
        confirm: null
      },
      passwordForm: false,
      mouseOver: false,
      image_filename: [],
      isPwdCurrent: true,
      isPwdNew: true,
      isPwdConfirm: true,
      genderOptions: [
        {
          label: 'Male',
          value: 'M'
        },
        {
          label: 'Female',
          value: 'F'
        }
      ]
    };
  },
  computed: {
    ...mapGetters('user', ['user', 'token']),
    imgUrl() {
      return process.env.NODE_ENV === 'production' &&
        this.user.image_filename &&
        this.user.image_filename.length > 5
        ? `${process.env.STATIC}users/${this.user.company_id}/${this.user.image_filename}`
        : 'https://cdn.quasar.dev/img/boy-avatar.png';
    },
    getImageSize() {
      return this.isDesktop ? '200px' : '125px';
    }
  },
  methods: {
    isDateValid,
    ...mapActions('user', ['setUser', 'setImage']),
    selectFile() {
      this.$refs.file_upload.pickFiles();
    },
    uploadFile(value) {
      const fileData = new FormData();
      fileData.append('folder', 'users');
      fileData.append(
        'user_profile_id',
        !!this.data.user_profile.user_profile_id
          ? this.data.user_profile.user_profile_id
          : 0
      );
      fileData.append('file', this.image_filename);

      DataService.post(`upload`, fileData)
        .then(response => {
          this.data.user_profile.image_filename = value.name;
          let data = [
            {
              table: 'user_profile',
              update: [
                {
                  image_filename: this.image_filename.name,
                  user_profile_id: this.data.user_profile.user_profile_id
                }
              ]
            }
          ];
          console.log('wait gong to update image_file', data);
          this.setImage(value.name);
          DataService.post(`crud`, data)
            .then(response => {
              console.log('image upload filed updated', response);
            })
            .catch(error => {
              console.log('image_filename Update Error', error);
            });
        })
        .catch(error => {
          console.log('Upload Error', error);
        });
    },

    onSubmit() {
      //var parts = this.data.user_profile.dob.split('-');
      /*
      const data = {
        user: this.data.user,
        user_profile: {
          ...this.data.user_profile,
          dob: this.mysqlDate(this.data.user_profile.dob)
        }
      };
      delete data.user_profile.image_filename;
      */
      let userProfileData = {};
      if (
        this.data.user_profile.user_profile_id == null ||
        this.data.user_profile.user_profile_id === 0
      ) {
        userProfileData = {
          table: 'user_profile',
          insert: [
            {
              ...this.data.user_profile,
              dob: this.mysqlDate(this.data.user_profile.dob)
            }
          ]
        };
      } else {
        userProfileData = {
          table: 'user_profile',
          update: [
            {
              ...this.data.user_profile,
              dob: this.mysqlDate(this.data.user_profile.dob)
            }
          ]
        };
      }
      const data = [
        {
          table: 'user',
          update: [{ ...this.data.user }]
        },
        { ...userProfileData }
      ];

      console.log('data before send', this.data.user_profile);
      DataService.post(`/crud`, data)
        .then(response => {
          console.log('profile', response.data);

          this.setUser(data.user);
          if (
            this.data.user_profile.user_profile_id == null ||
            this.data.user_profile.user_profile_id === 0
          ) {
            this.data.user_profile.user_profile_id =
              response.data.rows[1].insertId;
          }
          this.popupMessage('positive', 'Profile Updated Successfully.');
        })
        .catch(error => {
          console.log('mixin/ddlb Error', error);
          this.popupMessage('negative', 'Profile Failed to Updated.');
        });
    },
    onUpdatePassword() {
      const data = {
        passwordNew: this.password.new,
        passwordCurrent: this.password.current
      };
      //console.log('before updating password', data, this.token);
      DataService.post(`user/update-password`, data)
        .then(response => {
          console.log('profile', response);
          if (response.data.status === 'success') {
            this.popupMessage('positive', 'Password Updated Successfully.');
          } else {
            this.popupMessage('negative', 'Password Failed to Updated.');
          }
          this.password.new = null;
          this.password.current = null;
          this.password.confirm = null;
        })
        .catch(error => {
          console.log('mixin/ddlb Error', error);
          this.popupMessage('negative', 'Password Failed to Updated.');
        });
    },
    passwordRule(value) {
      if (value.length <= 7) {
        return 'Please enter at least 8 characters!';
      }
      if (value !== this.password.new) {
        this.passwordForm = false;
        return 'Password must be the same with the newly created password';
      } else {
        this.passwordForm = true;
      }
    }
  },
  created() {
    DataService.get(`user/profile`)
      .then(response => {
        const data = response.data.rows;
        if (response.data.rows) {
          this.data.user = {
            user_id: data[0].user_id,
            full_name: data[0].full_name,
            email_id: data[0].email_id,
            mobile: data[0].mobile
          };
          this.data.user_profile = {
            user_profile_id: !!data[0].user_profile_id
              ? data[0].user_profile_id
              : 0,
            dob:
              data[0].dob == null
                ? date.formatDate(Date.now(), 'YYYY-MM-DD')
                : data[0].dob,
            user_id: data[0].user_id,
            gender_id: data[0].gender_id == null ? 'M' : data[0].gender_id,
            image_filename: data[0].image_filename,
            gmail: data[0].gmail,
            facebook: data[0].facebook,
            linkedin: data[0].linkedin
          };
          // this.image_filename = [data[0].image_filename];
          //console.log('profile', data, this.user_profile);
        }
      })
      .catch(error => {
        console.log('Could not fetch user profile', error.message);
      });

    //console.log('mysql date', this.mysqlDate('14-09-2020'));
  }
};
</script>

<style scoped></style>

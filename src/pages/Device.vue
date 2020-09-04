<template>
 <div class="q-pa-md" style="max-width: 350px">
    <q-list bordered>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon color="primary" name="bluetooth" />
        </q-item-section>

        <q-item-section>Device : {{ deviceType }} </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>Device Height : {{ deviceHeight }} Wdith : {{ deviceWidth}} </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded color="purple" text-color="white" icon="bluetooth" />
        </q-item-section>

        <q-item-section>Browser : {{ browserName }} </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            R
          </q-avatar>
        </q-item-section>

        <q-item-section>Browser Version : {{ majorVersion }}</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>OS : {{ osVersion }} </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar square>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>Image square avatar</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
        </q-item-section>
        <q-item-section>Image rounded avatar</q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/mountains.jpg">
          </q-avatar>
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section thumbnail>
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
        <q-item-section>List item</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import device_mixin from 'src/mixins/device_mixin';
export default {
    data(){
        return {
            browserName : null,
            fullVersion : null,
            majorVersion : null
        };
    },
    mixins: [device_mixin],
    methods : {
        browserInfo(){
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            this.browserName  = navigator.appName;
            this.fullVersion  = ''+parseFloat(navigator.appVersion); 
            this.majorVersion = parseInt(navigator.appVersion,10);
            var nameOffset,verOffset,ix;

            // In Opera, the true version is after "Opera" or after "Version"
            if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
            this.browserName = "Opera";
            this.fullVersion = nAgt.substring(verOffset+6);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            this.fullVersion = nAgt.substring(verOffset+8);
            }
            // In MSIE, the true version is after "MSIE" in userAgent
            else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
            this.browserName = "Microsoft Internet Explorer";
            this.fullVersion = nAgt.substring(verOffset+5);
            }
            // In Chrome, the true version is after "Chrome" 
            else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
            this.browserName = "Chrome";
            this.fullVersion = nAgt.substring(verOffset+7);
            }
            // In Safari, the true version is after "Safari" or after "Version" 
            else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
            this.browserName = "Safari";
            this.fullVersion = nAgt.substring(verOffset+7);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
            this.fullVersion = nAgt.substring(verOffset+8);
            }
            // In Firefox, the true version is after "Firefox" 
            else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
            this.browserName = "Firefox";
            this.fullVersion = nAgt.substring(verOffset+8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                    (verOffset=nAgt.lastIndexOf('/')) ) 
            {
            this.browserName = nAgt.substring(nameOffset,verOffset);
            this.fullVersion = nAgt.substring(verOffset+1);
            if (this.browserName.toLowerCase()==this.browserName.toUpperCase()) {
            this.browserName = navigator.appName;
            }
            }
            // trim the this.fullVersion string at semicolon/space if present
            if ((ix=this.fullVersion.indexOf(";"))!=-1)
            this.fullVersion=this.fullVersion.substring(0,ix);
            if ((ix=this.fullVersion.indexOf(" "))!=-1)
            this.fullVersion=this.fullVersion.substring(0,ix);

            this.majorVersion = parseInt(''+this.fullVersion,10);
            if (isNaN(this.majorVersion)) {
            this.fullVersion  = ''+parseFloat(navigator.appVersion); 
            this.majorVersion = parseInt(navigator.appVersion,10);
            }          
        }
    },
    computed :{
        a(){
            return this.$q.screen.height
        }
    },
    mounted(){
        this.browserInfo()
    }
}
</script>

<style>

</style>
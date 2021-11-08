<script lang="ts">
import Vue from "vue";
import { isProd } from "./utils";
export default Vue.extend({
  mpType: "app",
  onLaunch() {
    console.log("App Launch");
    const env = isProd() ? "cloud1-1glmb0pe360feabe" : "dev-9gtfkukb94b57f1b";
    wx.cloud.init({
      env,
      //traceUser: true,
    });
    console.log(`[云开发环境ID]:${env}`);
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
});
</script>

<style lang="scss">
/*每个页面公共css */
@import "tailwindcss/utilities";
</style>

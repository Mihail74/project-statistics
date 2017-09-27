import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import restApi from "@/restapi";
import {UPDATE_ACCESS_TOKEN} from "@/store/modules/security.js"
export default {
  name: "signin",

  components: {
    SignInTab,
    RegisterTab
  },

  methods: {
    doSignIn(credentials) {
      this.$store.commit('security/'+ UPDATE_ACCESS_TOKEN, "aabbcc");

      restApi.post("/signin", credentials).then(data => {
        console.log(data)
      });
    }
  }
}

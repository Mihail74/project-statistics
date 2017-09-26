import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import restApi from "@/restapi";

export default {
  name: "signin",

  components: {
    SignInTab,
    RegisterTab
  },

  methods: {
    doSignIn(credentials) {
      console.log(credentials);
      restApi.post("/signin", credentials).then(data => {
        console.log(data)
      });
    }
  }
}

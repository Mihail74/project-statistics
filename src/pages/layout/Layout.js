import restApi from "@/restapi"
import { CLEAR_TOKENS } from "@/store/modules/security.js"

export default {
  name: "app",

  methods: {
    signOut() {
      restApi.post("/api/auth/signout")
        .then(this.redirectToSignIn, this.redirectToSignIn);
    },

    redirectToSignIn() {
      this.$store.dispatch(`security/${CLEAR_TOKENS}`);
      this.$router.push({ name: "signin" });
    }
  }
}

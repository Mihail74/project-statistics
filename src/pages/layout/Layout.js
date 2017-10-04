import restApi from "@/restapi"

export default {
  name: "app",

  methods: {
    signOut() {
      restApi.post("/api/auth/signout")
        .then(this.redirectToSignIn, this.redirectToSignIn);
    },

    redirectToSignIn() {
      this.$store.dispatch('security/clearTokens');
      this.$router.push("/signin");
    }
  }
}

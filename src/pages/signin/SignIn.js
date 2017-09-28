import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import restApi from "@/restapi";
export default {
  name: "signin",

  data() {
    return {
      snackBarDuration: 4000
    }
  },
  components: {
    SignInTab,
    RegisterTab
  },

  //TODO: похорешму, когда входим в этот компонент надо бы проверять
  //нет ли у нас токенов и пытаться залогиниться и только в случае не успеха открывать форму логина
  //эта логика есть в restApi.ensureSignIn может её и заиспользовать?

  methods: {
    doSignIn(credentials) {
      restApi.post("/signin", credentials)
        .then(data => {
          this.$store.dispatch('security/updateTokens', data)

          let redirect = this.$route.query.redirect || '/pages/games';
          this.$router.push(redirect);
        }, _ => {
          this.openSnackBar()
        });
    },

    openSnackBar() {
      this.$refs.snackbar.open();
    }
  }
}

import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import authService from "@/services/authorization"
import store from "@/store"

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

  beforeRouteEnter(to, from, next) {
    console.log(from)
    next(async vm => {
      if (authService.isTokensExist()) {
        if (authService.isAtiveTokenExist()) {
          vm.$router.push(from.fullPath);
        } else if (authService.canRefreshToken()) {
          await authService.refreshTokens()
            .then(data => {
              store.dispatch('security/updateTokens', data)
              vm.$router.push(from.fullPath);
            });
        }
      }
    })
  },

  methods: {
    doSignIn(credentials) {
      authService.signin(credentials)
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

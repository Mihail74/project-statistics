import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import securityService from "@/services/security"

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

  async beforeCreate() {
    //TODO: тут какая-то ошибка в консоли
    if (securityService.isTokensExist()) {
      if (securityService.isAtiveTokenExist()) {
        this.$router.push('/pages/games');
      } else if (securityService.canRefreshToken()) {
        await securityService.refreshTokens()
          .then(data => {
            this.$router.push('/pages/games');
          });
      }
    }
  },

  methods: {
    doSignIn(credentials) {
      securityService.signin(credentials)
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

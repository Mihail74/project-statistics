import SignInTab from "./SignInTab.vue";
import RegisterTab from "./RegisterTab.vue";
import authService from "@/services/authorization"
import store from "@/store"
import {UPDATE_TOKENS, UPDATE_PROFILE} from "@/store/modules/security.js"

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
    next(async vm => {
      if (authService.isTokensExist()) {
        if (authService.isAtiveTokenExist()) {
          vm.$router.push(from.fullPath);
        } else if (authService.canRefreshToken()) {
          await authService.refreshTokens()
            .then(data => {
              store.dispatch(`security/${UPDATE_TOKENS}`, data)
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
          this.$store.dispatch(`security/${UPDATE_TOKENS}`, data);
          this.$store.dispatch(`security/${UPDATE_PROFILE}`, data.user);

          let redirect = this.$route.query.redirect || { name: "games" };
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

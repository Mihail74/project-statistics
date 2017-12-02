import LoginTab from "./LoginTab.vue";
import RegisterTab from "./RegisterTab.vue";
import authService from "@/services/authorization";
import ApiErrors from "@/components/errors/apiErrors";
import {UPDATE_TOKENS, UPDATE_PROFILE} from "@/store/modules/security.js";

export default {
    name: "login",

    data() {
        return {
            apiErrors: null
        };
    },
    components: {
        LoginTab,
        RegisterTab,
        ApiErrors
    },

    beforeRouteEnter(to, from, next) {
        next(async vm => {
            if (authService.isTokensExist()) {
                if (authService.isAtiveTokenExist()) {
                    vm.$router.push(from.fullPath);
                } else if (authService.canRefreshToken()) {
                    await authService.refreshTokens()
                        .then(data => {
                            this.$store.dispatch(`security/${UPDATE_TOKENS}`, data);
                            vm.$router.push(from.fullPath);
                        });
                }
            }
        });
    },

    methods: {
        login(credentials) {
            authService.login(credentials)
                .then(data => {
                    this.$store.dispatch(`security/${UPDATE_TOKENS}`, data);
                    this.$store.dispatch(`security/${UPDATE_PROFILE}`, data.user);

                    let redirect = this.$route.query.redirect || { name: "games" };
                    this.$router.push(redirect);
                }).catch(errors => {
                    this.apiErrors = errors
                    this.openSnackBar();
                });
        },

        openSnackBar() {
            this.$refs.snackbar.open();
        }
    }
};

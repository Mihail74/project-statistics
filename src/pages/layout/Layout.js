import restApi from "@/restapi";
import { CLEAR_TOKENS, CLEAR_PROFILE } from "@/store/modules/security.js";

export default {
    name: "layout",
    data(){
        return {
            profile: this.$store.state.security.profile
        };
    },

    methods: {
        logout() {
            restApi.post("/api/auth/logout")
                .then(this.redirectToLogin, this.redirectToLogin);
        },

        redirectToLogin() {
            this.$store.dispatch(`security/${CLEAR_TOKENS}`);
            this.$store.dispatch(`security/${CLEAR_PROFILE}`);
            this.$router.push({ name: "login" });
        },

        toggleSidenav() {
            this.$refs["main-sidebar"].toggle();
        },

        closeSidenav() {
            this.$refs["main-sidebar"].close();
        },

        routeTo(routeName) {
            this.closeSidenav();
            this.$router.push({ name: routeName });
        }
    }
};

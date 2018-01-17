import RegisterTab from "./RegisterTab.vue";
import authService from "@/services/authorization";
import {UPDATE_TOKENS, UPDATE_PROFILE} from "@/store/modules/security.js";

export default {
    name: "login",

    data() {
        return {
            apiErrors: null
        };
    },
    components: {
        RegisterTab,
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
                });
        }
    }
};

import authService from "@/services/authorization"
import PsErrors from "@/components/errors/psErrors";

export default {
    name: "register-tab",

    data() {
        return {
            name: "",
            login: "",
            password: "",
            apiErrors: null
        }
    },
    components: {
        PsErrors
    },

    methods: {
        submit() {
            this.$validator.validateAll().then((isValid) => {
                if (isValid) {
                    this.register();
                    return;
                }
            });
        },
        register() {
            const credentials = {
                login: this.login,
                password: this.password,
                name: this.name
            };

            authService.register(credentials)
                .then(r => {
                    this.$emit("registered", credentials)
                }).catch(errors => {
                    this.apiErrors = errors
                });
        }
    }
}
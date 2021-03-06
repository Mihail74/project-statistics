import restApi from "@/restapi";
import PsErrors from "@/components/errors/psErrors";

export default {
    name: "create-game",

    data() {
        return {
            name: null,
            description: null,
            scoreToWin: null,
            teamCountInMatch: null,
            memberCountInTeam: null,
            apiErrors: null
        };
    },

    components: {
        PsErrors
    },

    methods: {
        submit() {
            this.$validator.validateAll().then((isValid) => {
                if (isValid) {
                    this.createGame();
                    return;
                }
            });
        },

        createGame() {
            restApi.post("/api/games/create", {
                name: this.name,
                description: this.description,
                scoreToWin: this.scoreToWin,
                teamCountInMatch: this.teamCountInMatch,
                memberCountInTeam: this.memberCountInTeam
            }).then(() => {
                this.clearInput();
                this.$router.push({
                    name: "games"
                });
            }).catch(errors => {
                this.apiErrors = errors
            });
        },

        clearInput() {
            this.$refs["name"].clearInput();
            this.$refs["description"].clearInput();
            this.$refs["scoreToWin"].clearInput();
            this.$refs["teamCountInMatch"].clearInput();
            this.$refs["memberCountInTeam"].clearInput();
        }
    }
};

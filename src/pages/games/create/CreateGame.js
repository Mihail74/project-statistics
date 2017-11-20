import restApi from "@/restapi";

export default {
    name: "create-game",

    data() {
        return {
            name: null,
            description: null,
            scoreToWin: null,
            teamCountInMatch: null,
            memberCountInTeam: null
        };
    },

    methods: {

        createGame() {
            restApi.post("/api/games/create", {
                name: this.name,
                description: this.description,
                scoreToWin: this.scoreToWin,
                teamCountInMatch: this.teamCountInMatch,
                memberCountInTeam: this.memberCountInTeam
            })
                .then(() => {
                    this.clearInput();
                    this.$router.push({ name: "games" });
                },
                () => {
                    //TODO: доделать обработку ошибок
                });
        },

        clearInput() {
            this.$refs["name"].clearInput();
            this.$refs["description"].clearInput();
            this.$refs["scoreToWin"].clearInput();
            this.$refs["teamCountInMatch"].clearInput();
            this.$refs["memberCountInTeam "].clearInput();
        }
    }
};
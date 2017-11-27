import restApi from "@/restapi";
import GameSelect from "@/components/games/select";
import TeamSelect from "@/components/teams/select";

export default {
    name: "create-team",

    components: {
        GameSelect,
        TeamSelect
    },

    data() {
        return {
            game: {},
            teamScores: [],
            profileID: this.$store.state.security.profile.id,
            cause: null,
            teamScore: null,
            validate: false
        };
    },

    methods: {
        submit() {
            this.$validator.validateAll().then((isValid) => {                
                if (isValid) {
                    this.create();
                    return;
                }
            });
        },

        create() {
            restApi.post("/api/matches/create", {
                    timestamp: Date.now(),
                    gameID: this.game.id,
                    teamsScore: this.teamScores.map(e => {
                        return {
                            teamID: e.team.id,
                            score: e.score
                        };
                    })
                }).then(
                    // первая функция-обработчик - запустится при вызове resolve
                    () => {
                        this.clearInput();
                        this.$router.push({ name: "matches" });
                    },
                    // вторая функция - запустится при вызове reject
                    error => {
                        this.cause = error.cause ? error.cause : "Ошибка правильности заполнения полей"
                    }
                );
        },

        changeGame(game) {
            this.game = game;
            this.teamScores.splice(0, this.teamScores.length);

            this.$nextTick(() => {
                //nextTick для того, чтобы удалились старые input'ы, которые возможно были заполнены, а не переиспользовались
                for (let i = 0; i < this.game.teamCountInMatch; ++i) {
                    this.teamScores.push({
                        team: {},
                        score: null
                    });
                }

            });
        },

        changeTeam(selectedTeam, teamIndex) {
            Object.assign(this.teamScores[teamIndex].team, selectedTeam);
        },

        changeTeamScore(inputedScore, teamIndex) {
            this.teamScores[teamIndex].score = inputedScore;
        },

        clearInput() {
            this.$refs["name"].clearInput();
            this.$refs["gameSelect"].clearInput();
        }
    }
};

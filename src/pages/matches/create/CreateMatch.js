import restApi from "@/restapi";
import GameSelect from "@/components/games/select";
import TeamSelect from "@/components/teams/select";
import PsErrors from "@/components/errors/psErrors";

export default {
    name: "create-team",

    components: {
        GameSelect,
        TeamSelect,
        PsErrors
    },

    data() {
        return {
            game: {},
            teamScores: [],
            profileID: this.$store.state.security.profile.id,
            cause: null,
            teamScore: null,
            validate: false,
            apiErrors: null
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
                    this.$router.push({
                        name: "matches"
                    });
                }
            ).catch(errors => {
                console.log('errors' + errors)
                this.apiErrors = errors
            });
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
            this.$refs["gameSelect"].clearSelect();
        }
    }
};

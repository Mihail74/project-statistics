import restApi from "@/restapi";
import GameSelect from "@/components/games/select";
import TeamSelect from "@/components/teams/select";

export default {
    name: "create-team",

    components:{
        GameSelect,
        TeamSelect
    },

    data() {
        return {
            game: {},
            teamScores: [],
            profileID: this.$store.state.security.profile.id
        };
    },

    methods: {

        create() {
            restApi.post("/api/matches/create", {
                timestamp: Date.now(),
                gameID: this.game.id,
                teamsScore: this.teamScores.map(e => {return {teamID: e.team.id, score: e.score};})
            })
                .then(() => {
                    this.clearInput();
                    this.$router.push({ name: "matches" });
                },
                () => {
                    //TODO: доделать обработку ошибок
                });
        },

        changeGame(game){
            this.game = game;
            this.teamScores.splice(0, this.teamScores.length);

            this.$nextTick(() => {
                //nextTick для того, чтобы удалились старые input'ы, которые возможно были заполнены, а не переиспользовались
                for(let i = 0; i < this.game.teamCountInMatch; ++i){
                    this.teamScores.push({team : {}, score: null});
                }

            });
        },

        chageTeam(selectedTeam, teamIndex){
            Object.assign(this.teamScores[teamIndex].team, selectedTeam);
        },

        chageTeamScore(inputedScore, teamIndex){
            this.teamScores[teamIndex].score =  inputedScore;
        },

        clearInput() {
            //TODO: чистить ввод
            // this.$refs["name"].clearInput();
            // this.$refs["gameSelect"].clearInput();
        }
    }
};

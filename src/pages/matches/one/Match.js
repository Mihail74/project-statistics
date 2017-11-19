import restApi from "@/restapi";

export default {
    name: "match",
    props: ["id"],

    data() {
        return {
            match: {
                game: {},
                teamsMatchScore: [],
                winnerTeam: {},
                timestamp: null
            }
        };
    },

    created() {
        this.fetchData();
    },


    methods: {
        fetchData() {
            restApi.get(`/api/matches/${this.id}`)
                .then(data => {
                    this.match = data.match;
                });
        },

        routeToGamesPage(){
            this.$router.push({ name: "games" });
        },

        routeToTeam(team){
            this.$router.push({ name: "team", params: { id: team.id } });
        },

        formatDate(date){
            return new Date(date).toLocaleString("ru", {year: "2-digit", month: "numeric", day: "numeric",hour: "2-digit", minute:"2-digit"});
        },
    }
};

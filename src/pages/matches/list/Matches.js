import restApi from "@/restapi";

export default {
    name: "matches",

    data() {
        return {
            matches: []
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            restApi.get("/api/matches/", {onlyMyMatches: true})
                .then(data => {
                    this.matches = data.matches;
                });
        },

        formatDate(date){
            return new Date(date).toLocaleString("ru", {year: "2-digit", month: "numeric", day: "numeric",hour: "2-digit", minute:"2-digit"});
        },

        routeToMatch(match){
            this.$router.push({ name: "match", params: { id: match.id } });
        },

        isMemberOfWinnerTeam(match){
            return match.winnerTeam.users.find(user => user.id == this.$store.state.security.profile.id);
        }
    }
};

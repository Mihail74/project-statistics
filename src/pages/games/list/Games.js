import restApi from "@/restapi";

export default {
    name: "games",

    data() {
        return {
            games: []
        };
    },

    mounted() {
        this.fetchData();
    },

    methods: {

        fetchData() {
            restApi.get("/api/games/")
                .then(data => {
                    this.games = data.games;
                });
        }
    }
};

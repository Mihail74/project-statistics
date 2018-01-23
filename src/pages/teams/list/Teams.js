import restApi from "@/restapi";
import mixin from "../mixin.js";

export default {
    name: "teams",

    data() {
        return {
            isLoading: false,
            page: {
                content: [],
                countOfElements: 0,
                pageNumber: 1,
                totalElements: 0,
                totalPages: 0
            }
        };
    },

    mixins: [mixin],

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            // this.isLoading = true;
            restApi.get("/api/teams/")
                .then(data => {
                    this.page = data.page;
                    // this.isLoading = false;
                });
        },

        routeToTeam(team) {
            this.$router.push({
                name: "team",
                params: {
                    id: team.id
                }
            });
        },
        onPagination(pageNumber){
            this.page.pageNumber = pageNumber;
            this.fetchData();
        }
    }
};

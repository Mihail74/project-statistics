import restApi from "@/restapi";
import MatchesFilter from "./MatchesFilter.vue";
export default {
    name: "matches",

    components: {
        MatchesFilter
    },

    data() {
        return {
            page: {
                content: [],
                countOfElements: 0,
                pageNumber: 1,
                totalElements: 0,
                totalPages: 0
            },
            filters: {
                onlyMyMatches: false,
                teamId: null
            },
            sortField: "TIMESTAMP",
            sortDirection: "DESC",
            isLoading: false
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            this.isLoading = true;
            restApi.get("/api/matches/", {
                onlyMyMatches: this.filters.onlyMyMatches,
                teamID: this.filters.teamID,
                sortField: this.sortField,
                sortDirection: this.sortDirection,
                pageNumber: this.page.pageNumber
            })
                .then(data => {
                    this.page = data.page;
                    this.isLoading = false;
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
        },

        reOrder(sortField) {
            this.sortField = sortField.name.toUpperCase();
            this.sortDirection = sortField.type.toUpperCase();
            this.fetchData();
        },
        onPagination(pageNumber){
            this.page.pageNumber = pageNumber;
            this.fetchData();
        },
        filterChanged(filters){
            this.filters.onlyMyMatches = filters.onlyMyMatches;
            this.filters.teamID = filters.teamID;
            this.fetchData();
        }
    }
};

import restApi from "@/restapi";

export default {
    name: "users",

    data() {
        return {
            users: []
        };
    },


    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            restApi.get("/api/users/", { includeMe: true })
                .then(data => {
                    this.users = data.users;
                });
        }
    }
};

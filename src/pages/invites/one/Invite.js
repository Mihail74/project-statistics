import restApi from "@/restapi";
import InviteStatus from "@/enums/invites/InviteStatus.js";

export default {
    name: "invite",
    props: ["id"],

    data() {
        return {
            invite: {
                team: {}
            }
        };
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            restApi.get(`/api/me/invites/${this.id}`)
                .then(data => {
                    this.invite = data.invite;
                });
        },

        routeToTeam() {
            this.$router.push({ name: "team", params: { id: this.invite.team.id } });
        },

        isNew(){
            return this.invite.status == InviteStatus.NEW;
        },

        accept() {
            restApi.post(`/api/me/invites/${this.id}/accept`)
                .then(() => {
                    this.$router.push({ name: "invites" });
                });
        },

        decline(){
            restApi.post(`/api/me/invites/${this.id}/decline`)
                .then(() => {
                    this.$router.push({ name: "invites" });
                });
        }
    }
};

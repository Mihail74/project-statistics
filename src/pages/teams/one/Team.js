import restApi from "@/restapi";
import mixin from "../mixin.js";
import InviteStatus from "@/enums/invites/InviteStatus.js";

export default {
    name: "team",
    props: ["id"],

    data() {
        return {
            team: {
                users: [],
                leader: {},
                game: {}
            },
            invites: []
        };
    },

    computed:{
        notAcceptedInvites(){
            return this.invites.filter(e => e.status != InviteStatus.ACCEPTED);
        }
    },

    mixins: [mixin],

    created() {
        this.fetchData();
    },


    methods: {
        fetchData() {
            restApi.get(`/api/teams/${this.id}`)
                .then(data => {
                    this.team = data.team;
                });

            restApi.get(`/api/teams/${this.id}/invites`)
                .then(data => {
                    this.invites = data.invites;
                });
        },

        formTeam() {
            restApi.post(`/api/me/teams/${this.id}/form`)
                .then(() => {
                    this.fetchData();
                });
        },

        isLeader() {
            return this.team.leader.id == this.$store.state.security.profile.id;
        },

        routeToGamesPage() {
            this.$router.push({
                name: "games"
            });
        },

        isDeclinedInvite(invite) {
            return invite.status == InviteStatus.DECLINED;
        }
    }
};

import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"
import InviteStatus from "@/enums/invites/InviteStatus.js"

export default {
  name: "team",
  props: ['id'],

  data() {
    return {
      team: {
        users: [],
        game: {}
      },
      invitedUsers: []
    }
  },

  created() {
    this.fetchData();
  },

  computed:{
    notAcceptedInvitedUsers(){
      return this.invitedUsers.filter(e => e.inviteStatus != InviteStatus.ACCEPTED)
    }
  },

  methods: {
    fetchData() {
      restApi.get("/api/teams/", { id: this.id })
        .then(data => {
          this.team = data.team;
          this.invitedUsers = data.invitedUsers || [];
        });
    },
    isForming() {
      return this.team.formingStatus == TeamFormingStatus.FORMING;
    },
    formTeam() {
      restApi.post("/api/me/teams/form", { id: this.id })
        .then(data => {
          this.fetchData();
        });
    }
  }
}

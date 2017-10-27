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
        leader: {},
        game: {}
      },
      invites: []
    }
  },

  created() {
    this.fetchData();
  },

  computed: {
    notAcceptedInvites() {
      return this.invites.filter(e => e.status != InviteStatus.ACCEPTED)
    },
    statistic() {
      return (this.team.numberOfMatches == 0 ? 0 : this.team.numberOfWinMatches / this.team.numberOfMatches) * 100;
    }
  },

  methods: {
    fetchData() {
      restApi.get(`/api/teams/${this.id}`)
        .then(data => {
          this.team = data.team;
          this.invites = data.invites || [];
        });
    },

    isForming() {
      return this.team.formingStatus == TeamFormingStatus.FORMING;
    },

    isLeader() {
      return this.team.leader.id == this.$store.state.security.profile.id;
    },

    isDeclineInvite(invite) {
      return invite.status == InviteStatus.DECLINED
    },

    formTeam() {
      restApi.put(`/api/me/teams/${this.id}/form`)
        .then(data => {
          this.fetchData();
        });
    }
  }
}

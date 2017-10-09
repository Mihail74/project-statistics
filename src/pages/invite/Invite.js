import Vue from "vue"
import restApi from "@/restapi"


export default {
  name: "invite",
  props: ['id'],

  data() {
    return {
      invite: {
        team: {}
      }
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get(`/api/me/teams/invites/${this.id}`)
        .then(data => {
          this.invite = data.invite;
        })
    },

    goToTeam(e) {
      this.$router.push({ name: "team", params: { id: this.invite.team.id } })
    },

    acceptInvite() {
      restApi.post("/api/me/teams/invites/accept", { id: this.id })
        .then(data => {
          this.$router.push({ name: "invites" })
        })
    }
  }
}

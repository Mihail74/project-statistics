import Vue from "vue"
import restApi from "@/restapi"
import InviteStatus from "@/enums/invites/InviteStatus.js"

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
          console.log("ok")
          this.invite = data.invite;
        }, _ =>{console.log('no ok')})
    },

    goToTeam(e) {
      this.$router.push({ name: "team", params: { id: this.invite.team.id } })
    },

    isNewInvite(){
      return this.invite.status == InviteStatus.NEW;
    },

    acceptInvite() {
      restApi.post(`/api/me/teams/invites/${this.id}/accept`)
        .then(data => {
          this.$router.push({ name: "invites" })
        })
    },

    declineInvite(){
      restApi.post(`/api/me/teams/invites/${this.id}/decline`)
        .then(data => {
          this.$router.push({ name: "invites" })
        })
    }
  }
}

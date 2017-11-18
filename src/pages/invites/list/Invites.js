import Vue from "vue"
import restApi from "@/restapi"
import InviteStatus from "@/enums/invites/InviteStatus.js"

export default {
  name: "invites",

  data() {
    return {
      invites: []
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      restApi.get("/api/me/invites/")
        .then(data => {
          this.invites = data.invites;
        })
    },

    routeToInvite(invite) {
      this.$router.push({ name: "invite", params: { id: invite.id } })
    },

    getStatusIcon(invite){
      switch(invite.status) {
        case InviteStatus.NEW:
          return 'fiber_new';
        case InviteStatus.ACCEPTED:
          return 'check';
        case InviteStatus.DECLINED:
          return 'close'
        default:
          return '';
        }
    },

    isAccepted(invite){
      return invite.status == InviteStatus.ACCEPTED;
    },

    isDeclined(invite){
      return invite.status == InviteStatus.DECLINED;
    }
  }
}

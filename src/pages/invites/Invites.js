import Vue from "vue"
import restApi from "@/restapi"


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
    onClick(team) {
      this.$router.push({ name: 'invite', params: { id: team.id } })
    }
  }
}

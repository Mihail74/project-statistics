import Vue from "vue"
import restApi from "@/restapi"
import mixin from "../mixin.js"

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
          this.invites = data.invites || [];
        });

      restApi.get(`/api/teams/${this.id}/invites`)
        .then(data => {
          this.invites = data.invites;
        });
    },

    formTeam() {
      restApi.post(`/api/me/teams/${this.id}/form`)
        .then(data => {
          this.fetchData();
        });
    },

    isLeader() {
      return this.team.leader.id == this.$store.state.security.profile.id;
    }
  }
}

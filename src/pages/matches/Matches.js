import Vue from "vue"
import restApi from "@/restapi"
import CreationMatchDialog from "./CreationMatchDialog.vue"

export default {
  name: "matches",

  components: {
    CreationMatchDialog,
  },

  data() {
    return {

    }
  },

  created() {
    // this.fetchData();
  },



  methods: {
    fetchData() {
      // restApi.get(`/api/teams/${this.id}`)
      //   .then(data => {
      //     this.team = data.team;
      //     this.invites = data.invites || [];
      //   });
    },
    openCreationDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}

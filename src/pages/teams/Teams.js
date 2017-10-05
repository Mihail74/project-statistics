import Vue from "vue"
import restApi from "@/restapi"
import CreationTeamDialog from "./CreationTeamDialog.vue"

export default {
  name: "teams",

  data() {
    return {

    }
  },

  components: {
    CreationTeamDialog
  },

  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {

    },

    openCreationGameDialog() {
      this.$refs["creationDialog"].openDialog();
    }
  }
}

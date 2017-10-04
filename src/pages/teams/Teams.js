import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "teams",

  data() {
    return {

    }
  },



  created() {
    this.fetchData();
  },

  methods: {

    fetchData() {

    },

    openCreationGameDialog() {
      // this.$refs["creationDialog"].openDialog();
    }
  }
}

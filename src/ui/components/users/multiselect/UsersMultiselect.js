import Vue from "vue"
import restApi from "@/restapi"

export default {
  name: "users-multiselect",

  data() {
    return {
      users: [],
      selected: []
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    changeSelected(value) {
      console.log(this.selected)
      console.log(this.users)

    },

    fetchData() {
      restApi.get("/api/users/").then(data => {
        this.users = data.users
      })
    },

    clearInput(){
      this.selected = [];
    }
  }
}

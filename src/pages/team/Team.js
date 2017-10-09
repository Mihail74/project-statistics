import Vue from "vue"
import restApi from "@/restapi"


export default {
  name: "team",

  data() {
    return {}
  },

  created() {
    alert(this.$route.params.id)
  },
  methods: {

  }
}

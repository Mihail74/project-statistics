import Vue from "vue"
import restApi from "@/restapi"
import UsersMultiselect from "@/components/users/multiselect"
import GameSelect from "@/components/games/select"

export default {
  name: "newteam",

  data() {
    return {
      name: "",
      selectedUsersID: [],
      selectedGameID: null
    }
  },

  components: {
    UsersMultiselect,
    GameSelect
  },

  methods: {

    changeUserSelect(selectedUsersID) {
      this.selectedUsersID = selectedUsersID;
    },
    changeGameSelect(selectedGameID) {
      this.selectedGameID = selectedGameID;
    },

    createTeam() {
      restApi.post("/api/teams/create", {
          name: this.name,
          gameID: this.selectedGameID,
          membersID: this.selectedUsersID
        })
        .then(data => {
          this.$emit("teamCreated");
          this.closeDialog();
          this.clearInput();
        })
    },

    clearInput() {
      this.name = "";
      this.selectedUsersID = [];
      this.selectedGameID = null;
      this.$refs["users"].clearInput();
      this.$refs["game"].clearInput();
    },

    openDialog() {
      this.$refs["creationDialog"].open();
    },

    closeDialog() {
      this.$refs["creationDialog"].close();
      this.clearInput();
    },
  }
}

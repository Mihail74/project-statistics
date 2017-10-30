<template>
<div>
  <team-select ref="team" v-bind:gameID="gameID" @change="changeTeamSelect"/>
</div>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"
import TeamFormingStatus from "@/enums/teams/TeamFormingStatus.js"
import TeamSelect from "@/ui/components/teams/select"

export default {
  name: "team-and-score",
  props: ["gameID"],

  components: {
    TeamSelect
  },

  data() {
    return {
      selectedTeamID: null
    }

  },

  methods: {
    changeTeamSelect(teamID) {
      this.selectedTeamID = teamID;
      this.$emit("changeTeamID", this.selectedTeamID);
    }
  }
}
</script>
<style></style>

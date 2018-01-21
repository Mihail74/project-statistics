<template>
  <md-whiteframe class="whiteframe">
    <h1>Фильтры</h1>
    <div>
      <md-checkbox id="onlyMyMatches" name="onlyMyMatches" v-model="onlyMyMatches">Только мои команды</md-checkbox>
      <team-select label="Обязательная команда участник" @change="changeTeam"/>
      <md-button class="md-raised md-primary" @click="filter">Применить</md-button>
    </div>

  </md-whiteframe>
</template>

<script>
import TeamSelect from "@/components/teams/select";

export default {
    components: {
        TeamSelect
    },

    data() {
        return {
            onlyMyMatches: false,
            teamID: null
        }
    },

    methods: {
      filter(){
        this.$emit("filter", {
          onlyMyMatches: this.onlyMyMatches,
          teamID: this.teamID
        });
      },
      changeTeam(selectedTeam) {
        this.teamID = selectedTeam.id
      }
    }
}
</script>

<style>
.whiteframe {
  padding-top: 8px;
  padding-left: 24px;
}
</style>

<template>
<md-input-container ref="select">
    <label>Команда</label>
    <md-select :required="required" id="team-select" v-model="selectedID" @change="changeSelected">
        <md-option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
        </md-option>
    </md-select>
</md-input-container>
</template>

<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
    name: "team-select",
    props: {
        required: Boolean,
        gameID: Number
    },

    data() {
        return {
            teams: [],
            selectedID: null
        }
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            restApi.get("/api/teams/", {
                    gameID: this.gameID
                })
                .then(data => {
                    this.teams = data.teams
                }, apiError => {
                    //TODO: обработать ошибку
                })
        },

        changeSelected(value) {
            const selectedTeam = this.teams.find(e => e.id == this.selectedID)
            this.$emit("change", selectedTeam);
        },

        clearInput() {
            this.selectedID = null;
        }
    }
}
</script>
<style></style>

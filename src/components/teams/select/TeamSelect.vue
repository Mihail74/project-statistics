<template>
<md-input-container ref="select" :class="{'md-input-invalid': errors.has('teamSelect')}">
    <label>Команда</label>
    <md-select :required="required" id="team-select" v-model="selectedID" @change="changeSelected" data-vv-name="teamSelect" v-validate="'required'">
        <md-option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
        </md-option>
    </md-select>
    <span class="md-error">{{ errors.first('teamSelect') }}</span>
    <span class="md-error">{{ cause }}</span>
</md-input-container>
</template>

<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
    name: "team-select",
    props: {
        required: Boolean,
        gameID: Number,
        memberID: Number,
        validate: Boolean
    },

    data() {
        return {
            teams: [],
            selectedID: null,
            cause: null
        }
    },

    validate() {
        return this.$validator.validateAll();
    },

    created() {
        this.fetchData();
    },
    
    methods: {
        fetchData() {
            restApi.get("/api/teams/", {
                    gameID: this.gameID,
                    memberID: this.memberID
                })
                .then(data => {
                    this.teams = data.teams
                },error => {
                    this.cause = error.cause ? error.cause : "Ошибка правильности заполнения полей"
                })
        },

        changeSelected(value) {
            const selectedTeam = this.teams.find(e => e.id == this.selectedID)
            this.$emit("change", selectedTeam);
        },

        clearSelect() {
            this.selectedID = '';
        }
    }
}
</script>
<style></style>

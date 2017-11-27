<template>
<md-input-container ref="select" :class="{'md-input-invalid': errors.has('gameSelect')}" md-clearable>
    <label>Игра</label>
    <md-select :required="required" id="game-select" v-model="selectedID" @change="changeSelected" data-vv-name="gameSelect" v-validate="'required'">
        <md-option v-for="game in games" :key="game.id" :value="game.id">
            {{ game.name }}
        </md-option>
    </md-select>
    <span class="md-error">{{ errors.first('gameSelect') }}</span>
    <span class="md-error">{{ cause }}</span>
</md-input-container>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
    name: "game-select",
    props: {
        required: Boolean
    },

    data() {
        return {
            games: [],
            selectedID: null,
            cause: null
        }
    },

    created() {
        this.fetchData();
    },

    methods: {

        validate() {
            return this.$validator.validateAll();
        },

        fetchData() {
            restApi.get("/api/games/")
                .then(data => {
                    this.games = data.games
                }, error => {
                    this.cause = error.cause ? error.cause : "Ошибка правильности заполнения полей"
                })
        },

        changeSelected() {
            const selectedGame = this.games.find(e => e.id == this.selectedID)
            this.$emit("change", selectedGame);
        },

        clearSelect() {
            this.selectedID = '';
        }
    }
}
</script>
<style></style>

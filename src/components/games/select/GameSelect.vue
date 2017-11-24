<template>
<md-input-container ref="select">
    <label>Игра</label>
    <md-select :required="required" id="game-select" v-model="selectedID" @change="changeSelected">
        <md-option v-for="game in games" :key="game.id" :value="game.id">
            {{ game.name }}
        </md-option>
    </md-select>
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

        clearInput() {
            this.$refs["select"].clearInput();
        }
    }
}
</script>
<style></style>

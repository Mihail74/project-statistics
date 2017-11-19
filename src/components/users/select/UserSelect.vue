<template>
<md-input-container md-clearable ref="select">
    <label>Пользователь</label>
    <md-select :required="required" id="user-select" v-model="selectedID" @change="changeSelected">
        <md-option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
        </md-option>
    </md-select>
</md-input-container>
</template>
<script>
import Vue from "vue"
import restApi from "@/restapi"

export default {
    name: "user-select",
    props: {
        required: Boolean
    },

    data() {
        return {
            users: [],
            selectedID: null
        }
    },

    created() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            restApi.get("/api/users/")
                .then(data => {
                    this.users = data.users
                }, apiError => {
                    //TODO: обработать ошибку
                })
        },

        changeSelected() {
            const selectedUser = this.users.find(e => e.id == this.selectedID)
            this.$emit("change", selectedUser);
        },

        clearInput() {
            this.$refs["select"].clearInput();
        }
    }
}
</script>
<style></style>

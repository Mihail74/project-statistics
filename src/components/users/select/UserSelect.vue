<template>
<md-input-container ref="select" :class="{'md-input-invalid': errors.has('userSelect')}">
    <label>Пользователь</label>
    <md-select :required="required" id="user-select" v-model="selectedID" @change="changeSelected" data-vv-name="userSelect" v-validate="'required'">
        <md-option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
        </md-option>
    </md-select>
    <span class="md-error">{{ errors.first('userSelect') }}</span>
    <span class="md-error">{{ cause }}</span>
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
            restApi.get("/api/users/")
                .then(data => {
                    this.users = data.users
                },error => {
                    this.cause = error.cause ? error.cause : "Ошибка правильности заполнения полей"
                })
        },

        changeSelected() {
            const selectedUser = this.users.find(e => e.id == this.selectedID)
            this.$emit("change", selectedUser);
        },

        clearSelected() {
            this.selectedID = '';
        }
    }
}
</script>
<style></style>

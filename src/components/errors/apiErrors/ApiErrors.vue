<template>
    <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="snackBarDuration">
        <template v-for="error in apiErrors">
            <span>{{ error.detail }}</span>
        </template>        
        <md-button class="md-accent" @click="$refs.snackbar.close()">ок</md-button>
    </md-snackbar>
</template>
<script>
export default {
    name: "api-errors",
    props: {
        apiErrors: Array
    },
    data() {
        return {
            snackBarDuration: 4000,
        }
    },
    methods: {
        open() {
            this.$refs.snackbar.open();
        },
    }
}
</script>
<style></style>

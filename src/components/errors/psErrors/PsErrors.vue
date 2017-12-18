<template>
    <div>
        <div v-for="error in psErrors">
            <span class="md-error">{{ error.detail }}</span>
        </div>   
    </div>
</template>
<script>
export default {
    name: "ps-errors",
    props: {
        psErrors: Array
    }
}
</script>
<style>
.md-error {
    color: red;
}
</style>

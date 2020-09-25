<template>
    <div v-if="toasterStatus">
        <p>{{ toasterMessage }}</p>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Toaster",
        computed: {
            ...mapGetters(["toasterStatus", "toasterMessage"])
        }
    }
</script>

<style scoped>

</style>

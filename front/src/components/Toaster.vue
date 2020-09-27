<template>
    <div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Toaster",
        computed: {
            ...mapGetters(["toasterMessage", "toasterType"])
        },
        mounted() {
            this.toast();
        },
        methods: {
            toast() {
                console.log(this.toasterType);
                switch(this.toasterType) {
                    case 'error':
                        this.$notify.error({
                            title: "Message de statut",
                            message: this.toasterMessage,
                            position: "bottom-left",
                        });
                        break;
                    case 'info':
                        this.$notify.info({
                            title: "Message de statut",
                            message: this.toasterMessage,
                            position: "bottom-left",
                        });
                        break;
                    default:
                        this.$notify({
                            type: this.toasterType,
                            title: "Message de statut",
                            message: this.toasterMessage,
                            position: "bottom-left",
                        });
                        break;
                }

            }
        }
    }
</script>

<style scoped>

</style>

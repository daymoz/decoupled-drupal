<template>
    <form class="login" @submit.prevent="login">
        <h1>Connexion</h1>
        <hr/>
        <label for="username">Nom d'utilisateur</label>
        <input required id="username" type="text" v-model="username">
        <label for="password">Mot de passe</label>
        <input required id="password" type="password" v-model="password">

        <button type="submit">{{ connectionStatus }}</button>
    </form>
</template>

<script>
    import { ACCESS_TOKEN_REQUEST } from "./../store/actions/auth";
    import { mapGetters } from "vuex";

    export default {
        name: "Login",
        data: () => {
            return {
                username: '',
                password: '',
            }
        },
        methods: {
            login: function() {
                console.log("Tentons de se connecter");
                const { username, password } = this;
                this.$store.dispatch(ACCESS_TOKEN_REQUEST, { username, password })
                    .then(() => {
                        this.$router.push("/");
                    });
            }
        },
        computed: {
            ...mapGetters(["connectionStatus"])
        }
    }
</script>

<style scoped>

</style>

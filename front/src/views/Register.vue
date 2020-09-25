<template>
    <form class="register" @submit.prevent="register">
        <h1>Inscription</h1>
        <hr/>
        <label for="username">Nom d'utilisateur</label>
        <input required id="username" type="text" v-model="name">

        <label for="email">Adresse mail</label>
        <input required id="email" type="email" v-model="mail">

        <label for="password">Mot de passe</label>
        <input required id="password" type="password" v-model="pass">

        <button type="submit">{{ registerStatus }}</button>
    </form>
</template>

<script>
    import { REGISTER_REQUEST } from "./../store/actions/register";
    import { mapGetters } from "vuex";

    export default {
        name: "Register",
        data: () => {
            return {
                name: '',
                mail: '',
                pass: '',
            }
        },
        methods: {
            register: function() {
                const { name, mail, pass } = this;
                console.log("Tentons de s'inscrire");
                this.$store.dispatch(REGISTER_REQUEST, { name, mail, pass })
                    .then(() => {
                        this.$router.push("/login")
                    });
            },
        },
        computed: {
            ...mapGetters(["registerStatus"])
        }
    }
</script>

<style scoped>

</style>

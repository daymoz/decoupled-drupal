<template>
    <form class="login" @submit.prevent="login">
        <h1>Connexion</h1>
        <hr/>
        <label for="username">Nom d'utilisateur</label>
        <input required id="username" type="text" v-model="username">
        <label for="password">Mot de passe</label>
        <input required id="password" type="password" v-model="password">

        <button type="submit">Se connecter</button>
    </form>
</template>

<script>
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

            }
        }
    }
</script>

<style scoped>

</style>

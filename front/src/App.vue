<template>
    <div id="app">
        <div id="nav">
            <ul>
                <li><router-link to="/" >Home</router-link></li>
                <li><router-link to="/login">Se connecter</router-link></li>
                <li><router-link to="/register">S'inscrire</router-link></li>
            </ul>
        </div>
        <router-view/>
        <Toaster/>
    </div>
</template>

<style lang="scss">
</style>
<script>
    import Toaster from "./components/Toaster";
    export default {
        components: {
            Toaster
        }
    }
</script>

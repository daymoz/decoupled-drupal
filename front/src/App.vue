<template>
    <div id="app">
        <div class="center">
            <vs-navbar center-collapsed square>

            </vs-navbar>
            <nav id="nav">
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li v-if="!isAuthenticated">
                        <router-link to="/login">Se connecter</router-link>
                    </li>
                    <li v-if="!isAuthenticated">
                        <router-link to="/register">S'inscrire</router-link>
                    </li>
                </ul>
            </nav>
            <div v-if="isAuthenticated" id="account">
                <p>Bonjour {{ getProfile[1].attributes.display_name }}</p>
                <nav>
                    <ul>
                        <li>
                            <router-link to="/profile">Mon profil</router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <router-view/>
        <Toaster/>
    </div>
</template>

<style lang="scss">
</style>
<script>
    import Toaster from "./components/Toaster";
    import {mapGetters} from "vuex";
    import VsNavbar from "vuesax/src/components/vsNavbar/Base/vsNavbar";

    export default {
        components: {
            VsNavbar,
            Toaster
        },
        computed: {
            ...mapGetters(['isAuthenticated', 'getProfile'])
        }
    }
</script>

<template>
    <div id="app">
        <TheHeader/>
        <el-main>
            <div class="container">
                <router-view/>
            </div>
        </el-main>
        <Toaster v-if="toasterStatus"/>
        <Loader v-if="isLoading"/>
        <TheFooter/>
    </div>
</template>


<script>
    import Toaster from "./components/Toaster";
    import {mapGetters} from "vuex";
    import Loader from "./components/Loader";
    import TheHeader from "./components/TheHeader";
    import TheFooter from "./components/TheFooter";

    export default {
        components: {
            TheFooter,
            TheHeader,
            Toaster,
            Loader,
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters(['toasterStatus', 'isLoading'])
        },
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

    $black: #2F3545;
    $primary: #734cf1;

    html {
        font-family: 'Montserrat', sans-serif;
    }

    #app {
        font-family: 'Montserrat', sans-serif;
        color: $black;

        button {
            font-weight: 700;
        }

        .header-title {
            margin: 0;
            color: $black;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: 'Lato', sans-serif;
        }

        .align-center {
            text-align: center;
        }
    }
</style>


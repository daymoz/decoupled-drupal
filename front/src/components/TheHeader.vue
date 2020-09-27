<template>
    <el-header>
        <div class="container">
            <el-menu mode="horizontal" active-text-color="#fff" id="navigation">
                <el-menu-item>
                    <router-link to="/"><h1 class="header-title"><img src="./../assets/logo.png" alt="Logo" width="48">Headless Drupal - Front</h1></router-link>
                </el-menu-item>
                <div class="account">
                    <router-link to="/login" tag="span" v-if="!isAuthenticated">
                        <el-button type="primary">
                            Se connecter
                        </el-button>
                    </router-link>
                    <router-link to="/register" tag="span" v-if="!isAuthenticated">
                        <el-button>
                            S'inscrire
                        </el-button>
                    </router-link>
                    <el-dropdown trigger="click" v-if="isAuthenticated" id="account">
                            <div class="el-dropdown-link">
                                <b>{{ getProfile[1].attributes.display_name }}</b>
                                <el-avatar size="large"
                                           :src="getProfile[2].attributes ? getMainUrl + getProfile[2].attributes.uri.url : ''"
                                           @error="errorHandler">
                                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                         alt="Default avatar">
                                </el-avatar>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-user">
                                    <router-link to="/profile" tag="span">Mon profil</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item icon="el-icon-data-board">
                                    <router-link to="/dashboard" tag="span">Tableau de bord</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item divided icon="el-icon-unlock">
                                    <span @click="logout">Se déconnecter</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-menu>
        </div>
    </el-header>
</template>

<script>
    import {mapGetters} from "vuex";
    import {AUTH_LOGOUT} from "./../store/actions/auth";

    export default {
        name: "TheHeader",
        computed: {
            getMainUrl() {
                return process.env.VUE_APP_API_URL;
            },
            ...mapGetters(['isAuthenticated', 'getProfile'])
        },
        methods: {
            logout() {
                this.$store.dispatch(AUTH_LOGOUT).then(() => {
                    //this.$router.push("/");
                });
            },
            errorHandler() {
                if (this.getProfile()[2]) {
                    return true
                }
            }
        },
    }
</script>

<style lang="scss">

    a {
        text-decoration: none;
    }

    #navigation {
        .account {
            float: none;
            display: flex;
            justify-content: flex-end;
            flex: 0 1 auto;
            height: 60px;
            line-height: 60px;

            button {
                margin-left: 1rem;

            }

            .el-dropdown-link {
                display: flex;
                align-items: center;
            }

            .el-avatar {
                margin-left: 1rem;
            }
        }
    }

    #account {
        cursor: pointer;
        display: flex;
        height: 60px;
        line-height: 60px;
        align-items: center;
    }
</style>

<template>
    <el-col :span="8" :offset="8">
        <el-form :label-position="'right'" :rules="rules" ref="loginForm" :model="ruleForm" class="login"
                 @submit.prevent="login">
            <el-card>
                <div slot="header" class="clearfix">
                    <h2>Connexion</h2>
                </div>
                <el-form-item label="Nom d'utilisateur" prop="username">
                    <el-input id="username" v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="Mot de passe" prop="password">
                    <el-input id="password" v-model="ruleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('loginForm')">Go !</el-button>
                    <el-button @click="resetForm('loginForm')">Réinitialiser</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </el-col>
</template>

<script>
    import {ACCESS_TOKEN_REQUEST} from "./../store/actions/auth";
    import {mapGetters} from "vuex";

    export default {
        name: "Login",
        data: () => {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: 'Il faut taper votre pseudonyme', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: 'Il faut taper votre mot de passe'}
                    ]
                }
            }
        },
        methods: {
            login(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("Tentons de se connecter");
                        const {username, password} = this.ruleForm;
                        this.$store.dispatch(ACCESS_TOKEN_REQUEST, {username, password})
                            .then(() => {
                                this.$router.push("/");
                            });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>
    h2 {
        margin: 0;
    }

</style>

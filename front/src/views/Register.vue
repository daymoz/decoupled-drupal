<template>
    <el-col :span="8" :offset="8">
        <el-form :label-position="'right'" :rules="rules" ref="registerForm" :model="ruleForm" class="login"
                 @submit.prevent="login">
            <el-card>
                <div slot="header" class="clearfix">
                    <h2>Inscription</h2>
                </div>
                <el-form-item label="Nom d'utilisateur" prop="name">
                    <el-input id="username" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Adresse mail" prop="mail">
                    <el-input id="email" v-model="ruleForm.mail"></el-input>
                </el-form-item>
                <el-form-item label="Mot de passe" prop="pass">
                    <el-input id="password" v-model="ruleForm.pass" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="register('registerForm')">S'inscrire</el-button>
                    <el-button @click="resetForm('registerForm')">Réinitialiser</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </el-col>
</template>

<script>
    import { REGISTER_REQUEST } from "./../store/actions/register";
    import { mapGetters } from "vuex";

    export default {
        name: "Register",
        data: () => {
            return {
                ruleForm: {
                    name: '',
                    mail: '',
                    pass: '',
                },
                rules: {
                    name: [
                        {required: true, message: 'Veuillez taper votre pseudonyme', trigger: 'blur'},
                    ],
                    mail: [
                        {required: true, message: 'Veuillez taper votre adresse mail'},
                        {type: 'email', message: 'Adresse mail non valide'}
                    ],
                    pass: [
                        {required: true, message: 'Veuillez taper votre mot de passe'}
                    ]
                }
            }
        },
        methods: {
            register(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("Tentons de s'inscrire");
                        const {name, mail, pass} = this.ruleForm;
                        this.$store.dispatch(REGISTER_REQUEST, { name, mail, pass })
                            .then(() => {
                                this.$router.push("/login")
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
        computed: {
            ...mapGetters(["registerStatus"])
        }
    }
</script>

<style scoped>
    h2 {
        margin: 0;
    }
</style>

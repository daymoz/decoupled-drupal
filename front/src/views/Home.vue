<template>
    <div class="home">
        <el-row>
            <el-col :span="12" :offset="6">
                <p class="align-center"><b>Headless Drupal - Front</b> présente un petit aperçu de ce qu'il est possible
                de faire en découplant le CMS Drupal et en utilisant un framework JS (ici VueJS) pour la navigation
                utilisateur.</p>
            </el-col>
        </el-row>
        <ArticleList></ArticleList>
    </div>
</template>

<script>
    // @ is an alias to /src

    import ArticleList from "../components/ArticleList";

    export default {
        name: 'Home',
        components: {
            ArticleList
        }
    }
</script>

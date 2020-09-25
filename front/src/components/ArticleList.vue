<template>
    <div>
        <h1>Quelques articles</h1>
        <div v-if="!gettingArticles">
            <ArticleHomeItem
                    v-for="(article, index) in articles"
                    :key="article.attributes.title+index"
                    :article="article"
                    :included="included"
            />

        </div>
    </div>
</template>

<script>
    import ArticleHomeItem from "./ArticleHomeItem";
    import {GET_ALL_ARTICLES} from "../store/actions/article";
    import { mapGetters } from "vuex";

    export default {
        name: "ArticleList",
        components: {
            ArticleHomeItem
        },
        mounted() {
            this.getAllArticles();
        },
        methods: {
            getAllArticles() {
                this.$store.dispatch(GET_ALL_ARTICLES)
                    .then(response => {
                        console.log('Articles :');
                        console.log(response);
                    });
            }
        },
        computed: {
            ...mapGetters(["articles", "included", "gettingArticles"]),
        }
    }
</script>

<style scoped>

</style>

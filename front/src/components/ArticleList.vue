<template>
    <div>
        <h2>Quelques articles</h2>

        <div class="articleList-wrapper" v-loading="gettingArticles">
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
    import {mapGetters} from "vuex";

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

<style lang="scss">
    .articleList {
        &-wrapper {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        &-item {
            display: flex;
            cursor: pointer;
            flex: 0 0 calc((100% / 3) - 1rem);
            margin-bottom: 2rem;
            h3 {
                margin: 0 0 1em 0;
            }
            .el-card {
                width: 100%;
            }
            .el-image {
                height: 300px;
            }
        }
    }
</style>

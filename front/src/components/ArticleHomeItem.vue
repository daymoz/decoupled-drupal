<template>
    <router-link tag="div" :to="'article/'+article.id">
        <h2>{{ article.attributes.title }}</h2>
        <img v-if="getMainImage.length" :src="getMainUrl+getMainImage[0].attributes.uri.url" :alt="article.relationships.field_image.data.meta.alt"/>
        <p>{{ getReleaseDate }}</p>
    </router-link>
</template>

<script>

    export default {
        name: "ArticleHomeItem",
        props: {
            article: {
                type: Object,
                required: true,
            },
            included: {
                type: Array,
                required: true,
            }
        },
        computed: {
            getMainUrl() {
                return process.env.VUE_APP_API_URL;
            },
            getMainImage() {
                const mainImageObject = this.included.filter(element => {
                   return element.id = this.article.relationships.field_image.data ? this.article.relationships.field_image.data.id : '';
                });
                console.log(mainImageObject);
                return mainImageObject;
            },
            getReleaseDate() {
                return Date.parse(this.article.attributes.changed);
            }
        }
    }
</script>

<style scoped>

</style>

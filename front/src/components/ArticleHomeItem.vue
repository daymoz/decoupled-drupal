<template>

    <router-link tag="div" :to="'article/'+article.id" class="articleList-item">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-image :src="getMainImageUrl || getDefaultImage"
                      :alt="article.relationships.field_image.data ? article.relationships.field_image.data.meta.alt : 'Default Image'"
                      fit="cover"
            >
                <div slot="placeholder" class="image-slot">
                    Chargement<span class="dot">...</span>
                </div>
            </el-image>
            <div style="padding: 14px;">
                <h3>{{ article.attributes.title }}</h3>
                <div class="bottom clearfix">
                    <time class="time">{{ getReleaseDate }}</time>
                </div>
            </div>
        </el-card>
    </router-link>
</template>

<script>
    import moment from 'moment';
    import defaultImage from './../assets/defaultimg.png';

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
        data: function() {
          return {
              defaultImage: defaultImage,
          }
        },
        computed: {
            getMainUrl() {
                return process.env.VUE_APP_API_URL;
            },
            getDefaultImage() {
                return defaultImage;
            },
            getMainImage() {
                console.log(this.article);
                console.log(this.included);
                const mainImageObject = this.included.filter(element => {
                    if(this.article.relationships.field_image.data) {
                        return element.id === this.article.relationships.field_image.data.id;
                    }
                });
                return mainImageObject;
            },
            getMainImageUrl() {
                return this.getMainImage.length > 0 ? this.getMainUrl + this.getMainImage[0].attributes.uri.url : null;
            },
            getReleaseDate() {
                return moment(Date.parse(this.article.attributes.changed)).format('DD MMM YYYY');
            }
        }
    }
</script>

<style scoped>

</style>

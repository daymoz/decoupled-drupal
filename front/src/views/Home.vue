<template>
  <div class="home">
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

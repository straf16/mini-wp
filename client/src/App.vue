<template>
  <div>
    <div v-show="page == 'home'">
      <Navbar @go="go"></Navbar>
      <div class="container is-fullhd">
        <div class="columns">
          <div class="column is-2 is-gapless sidebar">
            <Sidebar></Sidebar>
          </div>
          <div class="column is-10 is-gapless">
            <Content :articles="articles"></Content>
          </div>
        </div>
      </div>
    </div>
    <div v-show="page == 'articleForm'">
      <CreateArticle @go="go"></CreateArticle>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import CreateArticle from "./views/CreateArticle";
import axios from "../config/myaxios";

export default {
  data() {
    return {
      page: "home",
      articles: []
    };
  },
  components: {
    Navbar,
    Sidebar,
    Content,
    CreateArticle
  },
  methods: {
    go(page) {
      // console.log("di app dapet", page);
      if (page === "home") {
        this.fetchMyArticle();
      }
      this.page = page;
    },
    fetchMyArticle() {
      const loading = this.$buefy.loading.open();
      axios({
        method: "GET",
        url: "/articles/my-articles",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGMxNzUxNDIwOTZmMTE2NzYxZjY0MDciLCJuYW1lIjoiRmFkaWxhaCIsImVtYWlsIjoiZmFkaWxAbWFpbC5jb20iLCJpYXQiOjE1NzI5NjUyMTJ9.Jf3RYh5quLB9oJ-f-AbEEk9cTYN4m-EM7MpLv5rqvss"
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(err => console.log(err))
        .finally(() => loading.close());
    }
  },
  created() {
    this.fetchMyArticle();
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.sidebar {
  min-height: calc(100vh - 40px);
  /* background-color: red; */
}
</style>
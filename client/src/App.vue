<template>
  <div>
    <Navbar
      v-show="page === 'login' || page == 'home' || page == 'register'"
      @change-login="changeLogin"
      :isLogin="isLogin"
      :name="name"
      @go="go"
    ></Navbar>
    <div v-show="page === 'login'">
      <Login @go="go" @change-login="changeLogin"></Login>
    </div>
    <div v-show="page === 'register'">
      <Register @go="go"></Register>
    </div>
    <div v-show="page == 'home'">
      <div class="container is-fullhd">
        <div class="columns">
          <div class="column is-2 is-gapless sidebar">
            <Sidebar :name="name"></Sidebar>
          </div>
          <div class="column is-10 is-gapless">
            <Content
              :articles="articles"
              @delete-item="fetchMyArticle"
              @select-tag="filterArticlesbyTag"
            ></Content>
          </div>
        </div>
      </div>
    </div>
    <div v-show="page == 'articleForm'">
      <CreateArticle :name="name" @go="go"></CreateArticle>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import CreateArticle from "./views/CreateArticle";
import Login from "./views/Login";
import Register from "./views/Register";
import axios from "../config/myaxios";

export default {
  data() {
    return {
      page: "login",
      isLogin: false,
      name: "",
      email: "",
      articles: []
    };
  },
  components: {
    Navbar,
    Sidebar,
    Content,
    CreateArticle,
    Login,
    Register
  },
  methods: {
    go(page) {
      // console.log("di app dapet", page);
      this.fetchMyArticle();
      this.page = page;
      this.fetchLocalStorage();
    },
    changeLogin(value) {
      this.isLogin = value;
    },
    filterArticlesbyTag(tag) {
      axios({
        method: "GET",
        url: "/articles/search-tags",
        headers: {
          token: localStorage.getItem("token")
        },
        params: {
          keyword: tag
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(({ response }) => {
          console.log(response);
          this.$buefy.notification.open({
            message:
              "Sorry, your request could not be processed, please try again later",
            type: "is-danger",
            hasIcon: true
          });
        });
    },
    fetchLocalStorage() {
      this.name = localStorage.getItem("name");
      this.email = localStorage.getItem("email");
    },
    fetchMyArticle() {
      const loading = this.$buefy.loading.open();
      axios({
        method: "GET",
        url: "/articles/my-articles",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.articles = data;
        })
        .catch(({ response }) => {
          console.log(response);
          this.$buefy.notification.open({
            message:
              "Sorry, your request could not be processed, please try again later",
            type: "is-danger",
            hasIcon: true
          });
        })
        .finally(() => loading.close());
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.page = "home";
      this.isLogin = true;
      this.fetchMyArticle();
      this.fetchLocalStorage();
    }
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
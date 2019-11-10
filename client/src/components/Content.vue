<template>
  <div class="container" style="padding: 40px;">
    <b-tabs class="block">
      <b-tab-item label="Published"></b-tab-item>
      <b-tab-item label="Drafts"></b-tab-item>
    </b-tabs>
    <b-field grouped>
      <b-input placeholder="Search..." expanded></b-input>
      <p class="control">
        <button class="button is-primary">Search</button>
      </p>
    </b-field>

    <div v-for="article in articles" :key="article._id">
      <!-- {{articles}} -->
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-half">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ article.title }}</p>
                  <div class="columns">
                    <div class="column">
                      <p class="subtitle is-6">{{ getMoment(article.createdAt) }}</p>
                    </div>
                    <div class="column">
                      <b-taglist>
                        <span
                          v-for="(tag, index) in article.tags"
                          :key="index"
                          @click="filterTag(tag)"
                          style="cursor: pointer;"
                          class="tag is-light"
                        >{{tag}}</span>
                      </b-taglist>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-1">
              <div class="media-content">
                <figure class="image is-64x64">
                  <img v-if="article.featured_image" :src="article.featured_image" alt="Image" />
                  <img v-else src="../assets/default_image.png" alt="Image" />
                </figure>
              </div>
            </div>
            <div
              class="column is-1"
              style="display: flex; align-items: center; padding: 0 50px 0 50px;"
            >
              <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                <b-icon icon="dots-horizontal" slot="trigger"></b-icon>
                <b-dropdown-item aria-role="listitem">Update</b-dropdown-item>
                <b-dropdown-item aria-role="listitem" @click="deleteContent(article._id)">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../config/myaxios";
import moment from "moment";

export default {
  name: "Content",
  props: ["articles"],
  methods: {
    getMoment(date) {
      // console.log(new Date(date));
      return moment(date).fromNow();
    },
    filterTag(value) {
      this.$emit("select-tag", value);
    },
    deleteContent(id) {
      axios({
        method: "DELETE",
        url: `/articles/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$buefy.notification.open({
            message: "Delete Succesfull",
            type: "is-success",
            hasIcon: true
          });
          this.$emit("delete-item");
        })
        .catch(({ response }) => {
          this.$buefy.notification.open({
            message: "Cant delete, please try again",
            type: "is-danger",
            hasIcon: true
          });
        });
    }
  }
};
</script>

<style>
</style>
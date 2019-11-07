<template>
  <div class="container" style="padding: 40px;">
    <b-tabs class="block">
      <b-tab-item label="Published"></b-tab-item>
      <b-tab-item label="Drafts"></b-tab-item>
    </b-tabs>

    <div v-for="article in articles" :key="article._id">
      <!-- <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-half">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">The Journey Begins</p>
                  <p class="subtitle is-6">7 minutes ago</p>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-1">
              <div class="media-content">
                <figure class="image is-64x64">
                  <img
                    src="https://thumbor.forbes.com/thumbor/711x533/https://blogs-images.forbes.com/laurabegleybloom/files/2018/06/Bali-Sunset-JetsetChristina-Single-Fin-Uluwatu-Bali-1200x900.jpg?width=960"
                    alt="Image"
                  />
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
                <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-half">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">Before Begins</p>
                  <p class="subtitle is-6">a day ago</p>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-1">
              <div class="media-content">
                <figure class="image is-64x64">
                  <img
                    src="https://thumbor.forbes.com/thumbor/711x533/https://blogs-images.forbes.com/laurabegleybloom/files/2018/06/Bali-Sunset-JetsetChristina-Single-Fin-Uluwatu-Bali-1200x900.jpg?width=960"
                    alt="Image"
                  />
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
                <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
      </div>-->
      <!-- {{articles}} -->
      <div class="card">
        <div class="card-content">
          <div class="columns">
            <div class="column is-half">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ article.title }}</p>
                  <p class="subtitle is-6">{{ getMoment(article.createdAt) }}</p>
                </div>
              </div>
            </div>
            <div class="column"></div>
            <div class="column is-1">
              <div class="media-content">
                <figure class="image is-64x64">
                  <img
                    src="https://thumbor.forbes.com/thumbor/711x533/https://blogs-images.forbes.com/laurabegleybloom/files/2018/06/Bali-Sunset-JetsetChristina-Single-Fin-Uluwatu-Bali-1200x900.jpg?width=960"
                    alt="Image"
                  />
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
                <b-dropdown-item aria-role="listitem">Delete</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["articles"],
  methods: {
    getMoment(date) {
      // console.log(new Date(date));
      return moment(date).fromNow();
    }
  }
};
</script>

<style>
</style>
<template>
  <b-menu style="padding: 10px;">
    <article class="media" style="margin-bottom: 20px;">
      <figure class="media-left">
        <p style="font-size: 24px;">
          <i class="far fa-window-maximize"></i>
        </p>
      </figure>
      <div class="media-content" style="width: 70%;">
        <div class="content">
          <p style="width: 100%; margin: 0">
            <strong>{{name}}</strong>
          </p>
          <p id="desc">
            <small>{{getWebName}}</small>
          </p>
        </div>
      </div>
    </article>
    <b-menu-list>
      <b-menu-item icon="chart-bar" label="Stats"></b-menu-item>
    </b-menu-list>
    <b-menu-list>
      <b-menu-item
        icon="pencil"
        :active="isActive"
        :expanded="isActive"
        @click="isActive = !isActive"
      >
        <template slot="label" slot-scope="props">
          Site
          <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
        </template>
        <b-menu-item label="Pages"></b-menu-item>
        <b-menu-item label="Posts"></b-menu-item>
        <b-menu-item label="Media"></b-menu-item>
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    name: String
  },
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    getWebName() {
      const webName = this.name.replace(/\s+/g, "").toLowerCase();
      return webName + ".miniwp.com";
    }
  }
};
</script>

<style scoped>
#profile {
  width: 100%;
  height: 10%;
  font-size: 12px;
}
#desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-item .nav-link:hover {
  cursor: pointer;
  color: rgb(0, 72, 139);
}
</style>
<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item active>
        <i class="fab fa-wordpress"></i>&nbsp; My Site
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item>
        <i class="fas fa-newspaper"></i>&nbsp; Reader
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <button class="button is-info is-inverted">
          <i class="far fa-edit"></i>&nbsp; Write
        </button>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <b-dropdown aria-role="list" class="is-right">
          <!-- <p class="tag is-success" slot="trigger" role="button"> -->
          <div slot="trigger" role="button" style="font-size: 20px; margin-right: 15px;">
            <i class="fas fa-user-circle"></i>
          </div>
          <!-- </p> -->

          <b-dropdown-item aria-role="listitem">Profile</b-dropdown-item>
          <b-dropdown-item aria-role="listitem">Sign Out</b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.navbar {
  background-color: rgb(0, 72, 139) !important;
}
</style>

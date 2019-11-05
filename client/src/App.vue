<template>
  <div>
    <Navbar></Navbar>
    <div class="container is-fullhd">
      <div class="columns">
        <div class="column is-2 is-gapless sidebar">
          <Sidebar></Sidebar>
        </div>
        <div class="column is-10 is-gapless">
          <Content></Content>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";

export default {
  data() {
    return {
      text: "HAI"
    };
  },
  components: {
    Navbar,
    Sidebar,
    Content
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
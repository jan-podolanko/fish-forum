<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@import "./assets/colors.scss";

#app {
  font-family: "Jost", sans-serif !important;
  width: 75%;
}
html {
  background-color: $light-mode-medium;
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}
body {
  margin: 0;
}
nav {
  vertical-align: center;
}
button {
  background-color: $primary;
  border-radius: 6px;
  color: $on-primary;
  border: 0;
  vertical-align: center;
  font-family: "Jost", sans-serif;
}
button:hover {
  background-color: darken($primary, 20%) !important;
  color: $on-primary-dark;
  outline: 2px solid $on-primary-dark;
  cursor: pointer;
}
form {
  z-index: 30;
}
</style>

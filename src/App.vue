<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div id="navBar">
      <img id="logo" src="./assets/logo.svg" />
      <nav>
        <RouterLink class="navLink" to="/">Home</RouterLink>
        <RouterLink class="navLink" to="/create">Create post</RouterLink>
        <RouterLink class="navLink" to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
#app {
  font-family: "Jost", sans-serif;
}
html {
  background-color: lightgoldenrodyellow;
  /*overflow-y: scroll;*/
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}
#navBar > * {
  display: inline;
}
#logo {
  height: 50px;
}
header {
  background-color: brown;
  height: 80px;
  margin-bottom: 10px;
}
.navLink {
  font-size: 25px;
  background-color: burlywood;
  margin: 10px 5px;
  padding: 5px 10px;
  letter-spacing: 3px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
}
.navLink:hover {
  background-color: lightcoral;
  color: white;
}
body {
  margin: 0;
}
nav {
  vertical-align: center;
}
</style>

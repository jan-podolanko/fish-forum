<script lang="ts">
import { RouterLink } from "vue-router";
import { mapGetters } from "vuex";
import { auth } from "../firebase/firebase";
export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.replace({
          name: "home",
        });
      });
    },
  },
};
</script>

<template>
  <header>
    <div id="navBar">
      <img id="logo" src="../assets/logo.svg" />
      <nav>
        <RouterLink class="navLink" to="/">Home</RouterLink>
        <RouterLink class="navLink" to="/create">Create post</RouterLink>
        <RouterLink class="navLink" to="/register">Register</RouterLink>
        <RouterLink v-if="!user.loggedIn" class="navLink" to="/login">Login</RouterLink>
        <button v-else @click="signOut" class="navLink">Sign out</button>
      </nav>
      <div v-if="user.loggedIn">Logged in as: {{ user.data }}</div>
    </div>
  </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
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
  border: 0;
}
.navLink:hover {
  background-color: lightcoral;
  color: white;
  cursor: pointer;
}
nav {
  vertical-align: center;
}
</style>

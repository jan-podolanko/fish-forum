<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { auth } from "../firebase/firebase";

export default defineComponent({
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
});
</script>

<template>
  <div id="navBar">
    <!-- <img id="logo" src="../assets/forum_logo.png" /> -->
    <li>
      <RouterLink class="navLink" to="/">Home</RouterLink>
      <RouterLink class="navLink" to="/create">Create post</RouterLink>
      <RouterLink class="navLink" to="/register">Register</RouterLink>
      <RouterLink v-if="!user.loggedIn" class="navLink" to="/login">Login</RouterLink>
      <button v-else @click="signOut" class="navLink">Sign out</button>
    </li>
    <div v-if="user.loggedIn">Logged in as: {{ user.data.displayName }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#logo {
  position: relative;
  height: 50px;
  top: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
header {
  background-color: $light-mode-light;
  color: $on-light-mode;
  height: 80px;
  margin-bottom: 10px;
}
.navLink {
  background-color: $primary;
  color: $on-primary;
  font-size: 25px;
  margin: 10px 5px;
  padding: 5px 10px;
  letter-spacing: 3px;
  border-radius: 10px;
  text-decoration: none;
  border: 0;
  display: block;
  font-family: "Jost", sans-serif;
}
.navLink:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
#navBar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 25%;
  background-color: $light-mode-light;
  height: 100%;
  position: fixed;
  overflow: auto;
  right: 0;
  top: 0;
}
</style>

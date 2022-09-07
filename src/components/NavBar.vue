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
    <div id="logoFish">🐟🐟🐟</div>
    <li>
      <RouterLink class="navLink" to="/">Home</RouterLink>
      <RouterLink class="navLink" to="/create">Create post</RouterLink>
      <RouterLink class="navLink" to="/register">Register</RouterLink>
      <RouterLink v-if="!user.loggedIn" class="navLink" to="/login">
        Login
      </RouterLink>
      <button v-else id="logOut" @click="signOut" class="navLink">
        Sign out
      </button>
    </li>
    <div id="userData" v-if="user.loggedIn">
      Logged in as: {{ user.data.displayName }}
    </div>
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
.navLink {
  background-color: $primary;
  color: $on-primary;
  font-size: 25px;
  margin: {
    left: 10px;
    right: 10px;
    top: 10px;
  }
  padding: 5px 10px;
  letter-spacing: 3px;
  border-radius: 6px;
  text-decoration: none;
  border: 0;
  max-width: calc(100% - 20px);
  text-align: left;
  display: block;
  font-family: "Jost", sans-serif;
}
#logOut {
  width: calc(100% - 20px);
}
.navLink:hover {
  background-color: darken($primary, 20%);
  color: $on-primary-dark;
  cursor: pointer;
  outline: 2px solid white;
}
#navBar {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 25%;
  max-width: 250px;
  background-color: $primary-dark;
  height: 100%;
  position: fixed;
  overflow: auto;
  right: 0;
  top: 0;
}
#userData {
  margin: {
    top: 30px;
    left: 15px;
  }
  color: $on-primary-dark;
}
#logoFish {
  text-align: center;
  font-size: 36px;
  user-select: none;
  margin-left: 10px;
  margin-right: 10px;
}
</style>

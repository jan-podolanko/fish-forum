<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import AddPost from "../components/AddPost.vue";

export default defineComponent({
  components: {
    AddPost,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
});
</script>

<template>
  <div v-if="user.loggedIn">
    <AddPost />
  </div>
  <div v-else id="not-logged-in">
    <div id="logo">🐟🐟🐟</div>
    <div>You are not logged in.</div>
    <RouterLink class="nav-link" to="/login">Sign in here</RouterLink>
    <div>or</div>
    <RouterLink class="nav-link" to="/register">Register</RouterLink>
  </div>
</template>

<style lang="scss">
@import "../assets/colors.scss";
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
#not-logged-in {
  margin: {
    top: 20%;
  }
  text-align: center;
  font-size: xx-large;
}
.nav-link {
  background-color: $primary;
  color: $on-primary;
  font-size: xx-large;
  padding: 5px 10px;
  letter-spacing: 3px;
  border-radius: 6px;
  text-decoration: none;
  border: 0;
  text-align: center;
  display: block;
  max-width: fit-content;
  margin: auto;
}
.nav-link:hover {
  background-color: $primary-dark;
  color: $on-primary-dark;
  cursor: pointer;
}
#logo {
  font-size: 50px;
  user-select: none;
}
</style>

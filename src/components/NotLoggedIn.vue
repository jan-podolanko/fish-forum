<template>
    <div id="logo">🐟🐟🐟</div>
    <div>You are not logged in.</div>
    <RouterLink class="nav-link" to="/login">Sign in here</RouterLink>
    <div>or</div>
    <RouterLink class="nav-link" to="/register">Register</RouterLink>
</template>

<style lang="scss">
@import "../assets/colors.scss";

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

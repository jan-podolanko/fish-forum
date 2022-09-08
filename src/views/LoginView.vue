<script lang="ts">
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>

<template>
  <LoginForm />
  <div id="message">
    <div>Don't have an account?</div>
    <RouterLink id="link" to="/login">Register here</RouterLink>
  </div>
</template>

<style lang="scss">
@import "../assets/colors.scss";
#message {
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: $light-mode-light;
  text-align: center;
  width: 300px;
  font-size: 1.5em;
  padding: 10px;
}
</style>

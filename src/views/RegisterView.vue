<script lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";
export default {
  components: {
    RegisterForm,
  },
};
</script>

<template>
  <div>
    <RegisterForm />
    <div id="message">
      <div>Already registered? Sign in</div>
      <RouterLink to="/login">here</RouterLink>
    </div>
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

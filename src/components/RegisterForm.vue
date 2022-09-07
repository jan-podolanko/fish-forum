<script lang="ts">
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { defineComponent } from "vue";
import { auth } from "../firebase/firebase";

export default defineComponent({
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: this.form.name,
          });
          this.$router.push({
            name: "home",
          });
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
});
</script>

<template>
  <form @submit.prevent="submit">
    <input
      id="name"
      type="name"
      required
      v-model="form.name"
      placeholder="Name"
    />
    <input
      id="email"
      type="email"
      required
      v-model="form.email"
      placeholder="E-mail"
    />
    <input
      id="password"
      type="password"
      required
      minlength="6"
      v-model="form.password"
      placeholder="Password"
    />
    <div id="buttons">
      <button id="submit" type="submit">Register</button>
    </div>
  </form>
  <div v-if="error">{{ error }}</div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

form {
  max-width: 200px;
  padding: 10px;
  margin: {
    top: 20%;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: $light-mode-medium;
}
form > * {
  font-family: "Jost", sans-serif;
  font-size: 1em;
}
input {
  margin: 10px auto;
  border: 0;
  border-bottom: 2px solid $primary;
  background-color: $light-mode-light;
  display: block;
  outline: 0;
}
input:focus {
  border: 0px;
  outline: 0 !important;
  border-bottom: 2px solid $primary-dark;
}
#buttons {
  display: block;
  text-align: center;
}
#submit {
  font-size: 1.2em;
  padding: 3px 10px;
}
</style>

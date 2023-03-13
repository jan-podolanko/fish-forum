<script lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { defineComponent } from "vue";
import { auth } from "../firebase/firebase";

export default defineComponent({
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then(() => {
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
  <div class="centered-container">
    <form @submit.prevent="submit">
      <div id="website-name">
        Sign into <br />
        Fish Forum <br />
        🐟🐟🐟
      </div>
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
        v-model="form.password"
        placeholder="Password"
      />
      <div id="buttons">
        <button id="submit" type="submit">Login</button>
      </div>
    </form>
    <div class="message" id="error-message" v-if="error">{{ error }}</div>
    <div class="message" id="message">
      <div>Don't have an account?</div>
      <RouterLink id="link" to="/register">Register here</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";
.centered-container {
  position: relative;
}
#website-name {
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 50px;
}
form {
  width: 300px;
  font-size: 1.5em;
  padding: 10px;
  margin: {
    top: 10%;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: $light-mode-light;
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
#error-message {
  border: 3px solid $danger;
  background-color: $danger;
  color: white;
}
#message {
  border: 3px solid black;
  background-color: $light-mode-light;
}
.message {
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 300px;
  font-size: 1.5em;
  padding: 10px;
}
</style>

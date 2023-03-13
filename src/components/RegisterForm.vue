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
        confirmpassword: "",
      },
      error: "",
    };
  },
  methods: {
    register() {
      if (this.form.password === this.form.confirmpassword) {
        createUserWithEmailAndPassword(
          auth,
          this.form.email,
          this.form.password
        )
          .then(() => {
            const user = auth.currentUser;
            if (user) {
              updateProfile(user, {
                displayName: this.form.name,
              });
              this.$router.push({
                name: "home",
              });
            }
          })
          .catch((error) => {
            this.error = error.message;
          });
      } else {
        this.error = "Passwords don't match.";
      }
    },
  },
});
</script>

<template>
  <form @submit.prevent="register">
    <div id="website-name">
      Sign up to <br />
      Fish Forum <br />🐟🐟🐟
    </div>
    <input
      id="name"
      type="name"
      required
      minlength="4"
      maxlength="30"
      v-model="form.name"
      placeholder="Name"
    />
    <input
      id="email"
      type="email"
      required
      maxlength="254"
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
    <input
      id="confirmPassword"
      type="password"
      required
      minlength="6"
      v-model="form.confirmpassword"
      placeholder="Confirm Password"
    />
    <div id="buttons">
      <button id="submit" type="submit">Register</button>
    </div>
  </form>
  <div id="error-message" v-if="error">{{ error }}</div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#website-name {
  font-size: 2em;
  text-align: center;
  margin-bottom: 50px;
}
form {
  width: 300px;
  padding: 10px;
  margin: {
    top: 50px;
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
  font-size: 1.5em;
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
  margin-top: 10px;
  font-size: 1.2em;
  padding: 5px 10px;
}
#error-message {
  margin: {
    top: 20px;
    left: auto;
    right: auto;
  }
  border: 3px solid $danger;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: $danger;
  color: white;
  text-align: center;
  width: 300px;
  font-size: 1.5em;
  padding: 10px;
}
</style>

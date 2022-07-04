<script>
/* import { initAuth } from "../firebase/auth";
const { loginEmailPassword, registerEmailPassword, logout } = initAuth();
 */
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
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
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
  },
};
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
      <button type="submit">Register</button>
    </div>
  </form>
  <div v-if="error">{{ error }}</div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

form {
  max-width: 200px;
  padding: 10px;
  margin: auto;
  border: 3px solid black;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
}
form > * {
  font-family: "Jost", sans-serif;
}
input {
  margin: 10px auto;
  border: 0;
  border-bottom: 2px solid brown;
  background-color: lightgoldenrodyellow;
  display: block;
  outline: 0;
}
input:focus {
  border: 0px;
  outline: 0 !important;
  border-bottom: 2px solid red;
}
#buttons {
  display: block;
  text-align: center;

  button {
    background-color: burlywood;
    margin: 0px 5px;
    border: 0;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
  }
  button:hover {
    background-color: lightcoral;
    color: white;
    cursor: pointer;
  }
}
</style>

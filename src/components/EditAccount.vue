<script lang="ts">
import { auth } from "@/firebase/firebase";
import { deleteUser, updatePassword, updateProfile } from "@firebase/auth";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  data() {
    return {
      form: {
        name: "",
      },
      error: "",
      newPassword: "",
      confirmNewPassword: "",
      pictureURL: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    changeName() {
      updateProfile(auth.currentUser, {
        displayName: this.form.name,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    changePicture() {
      updateProfile(auth.currentUser, {
        photoURL: this.pictureURL,
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch((error) => {
          this.error = error.message;
        });
    },
    changePassword() {
      if (this.newPassword == this.confirmNewPassword) {
        updatePassword(auth.currentUser, this.newPassword)
          .then(() => {
            // Update successful.
          })
          .catch((error) => {
            this.error = error.message;
          });
      } else {
        this.error = "Passwords don't match.";
      }
    },
    deleteAccount() {
      let deletion = confirm("Are you sure you want to delete your account?");
      if (deletion) {
        deleteUser(auth.currentUser)
          .then(() => {
            // User deleted.
          })
          .catch((error) => {
            // An error ocurred
            this.error = error.message;
          });
      }
    },
  },
});
</script>

<template>
  <div id="box" v-if="user.loggedIn">
    <div id="userData">
      <div>Logged in as: {{ user.data.displayName }}</div>
      <div>Email address: {{ user.data.email }}</div>
    </div>
    <form>
      <div class="buttons">Change your display name?</div>
      <input
        id="name"
        type="name"
        required
        v-model="form.name"
        placeholder="Name"
      />
      <div class="buttons">
        <button @click="changeName()">Submit</button>
      </div>
    </form>
    <form>
      <div class="buttons">Change your password?</div>
      <input
        id="password"
        type="password"
        required
        minlength="6"
        v-model="newPassword"
        placeholder="Password"
      />
      <input
        id="confirmPassword"
        type="password"
        required
        minlength="6"
        v-model="confirmNewPassword"
        placeholder="Confirm password"
      />
      <div class="buttons">
        <button @click="changePassword()">Submit</button>
      </div>
    </form>
    <button id="deleteButton" @click="deleteAccount()">Delete account</button>
    <div id="errorMessage" v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/colors.scss";

#box {
  margin-top: 20%;
  text-align: center;
}
form {
  width: 200px;
  padding: 10px;
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: darken($light-mode-light, 5%);
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
.buttons {
  margin: auto;
  text-align: center;
  button {
    font-size: large;
  }
}
#errorMessage {
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border: 3px solid rgb(131, 10, 10);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: rgb(131, 10, 10);
  color: white;
  text-align: center;
  width: 200px;
  padding: 10px;
}
#userData {
  width: 200px;
  padding: 10px;
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: darken($light-mode-light, 5%);
}
#deleteButton {
  background-color: rgb(131, 10, 10);
  color: white;
  padding: 10px;
  margin: {
    top: 10px;
    left: auto;
    right: auto;
  }
}
#deleteButton:hover {
  background-color: lighten(rgb(131, 10, 10), 10%);
  color: black;
}
</style>

<script lang="ts">
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { db } from "../firebase/firebase";

export default defineComponent({
  data() {
    return {
      form: {
        title: "",
        user: "",
        content: "",
      },
      currentDate: Timestamp.now(),
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    submit() {
      addDoc(collection(db, "posts"), {
        title: this.form.title,
        user: this.user.data.displayName,
        email: this.user.data.email,
        content: this.form.content,
        date: Timestamp.now(),
        rating: 0,
        upvotedby: [],
      });
    },
  },
});
</script>

<template>
  <form @submit.prevent="submit">
    <input required v-model="form.title" placeholder="Title" />
    <textarea required v-model="form.content" placeholder="Post content" />
    <button id="submitButton">Submit</button>
  </form>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";

form {
  width: 250px;
  padding: 10px;
  margin: {
    top: 20%;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  background-color: $light-mode-medium;
}
form > * {
  font-family: "Jost", sans-serif;
  margin: 10px auto;
  display: block;
  font-size: 1em;
}
input {
  width: 90%;
}
textarea {
  width: 90%;
  height: 100px;
  resize: none;
  font-family: "Jost", sans-serif;
}
#submitButton {
  width: 50%;
  font-size: 1.2em;
  height: 30px;
}
</style>

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
    addPost() {
      addDoc(collection(db, "posts"), {
        title: this.form.title,
        userName: this.user.data.displayName,
        userEmail: this.user.data.email,
        userId: this.user.data.id,
        content: this.form.content,
        date: Timestamp.now(),
        rating: 1,
        upvotedBy: [],
        downvotedBy: [],
      }).then(() => {
        this.$router.replace({
          name: "home",
        });
      });
    },
  },
});
</script>

<template>
  <form @submit.prevent="addPost">
    <div id="post-header">Create a Post:</div>
    <input
      id="postTitle"
      required
      v-model="form.title"
      maxlength="300"
      placeholder="Title"
    />
    <textarea
      id="postContent"
      required
      v-model="form.content"
      maxlength="40000"
      placeholder="Post content"
    />
    <button id="submitButton">Submit</button>
  </form>
</template>

<style lang="scss" scoped>
@import "../assets/colors.scss";
#post-header {
  font-size: 1.8em;
  text-align: center;
  margin-bottom: 50px;
}
form {
  width: 400px;
  font-size: 1.5em;
  padding: 10px;
  margin: {
    top: 20%;
    left: auto;
    right: auto;
  }
  border: 3px solid black;
  border-radius: 6px;
  align-items: center;
  background-color: $light-mode-light;
}
form > * {
  font-family: "Jost", sans-serif;
  margin: 10px auto;
  display: block;
  font-size: 1em;
}
input {
  width: 90%;
  border: 1px black solid;
  border-radius: 6px;
  padding: {
    top: 3px;
    left: 5px;
    right: 5px;
  }
}
textarea {
  width: 90%;
  height: 100px;
  resize: none;
  border: 1px black solid;
  font-family: "Jost", sans-serif;
  border-radius: 6px;
  padding: {
    top: 3px;
    left: 5px;
    right: 5px;
  }
}
#submitButton {
  width: 50%;
  font-size: 1.2em;
}
</style>

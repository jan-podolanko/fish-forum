<script lang="ts">
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { db } from "../firebase/firebase";

export default defineComponent({
  data() {
    return {
      form: {
        user: "",
        content: "",
      },
    };
  },
  props: {
    id: String,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    addComment() {
      //@ts-ignore
      addDoc(collection(db, "posts", this.id, "comments"), {
        username: this.user.data.displayName,
        email: this.user.data.email,
        content: this.form.content,
        date: Timestamp.now(),
        rating: 1,
        upvotedby: [],
      });
      console.log(this.id);
    },
  },
});
</script>

<template>
  <form id="addComment" @submit.prevent="addComment">
    <div>Commenting as: {{ user.data.displayName }}</div>
    <textarea
      id="commentContent"
      required
      v-model="form.content"
      placeholder="Comment here"
    />
    <button class="material-symbols-outlined">send</button>
  </form>
</template>

<style lang="scss">
@import "../assets/colors.scss";

#addComment {
  background-color: $light-mode-light;
  margin: 15px;
  height: 120px;
  padding: 15px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-radius: 6px;
  #commentContent {
    padding: {
      top: 3px;
      left: 5px;
      right: 5px;
    }
    height: 80px;
    width: calc(100% - 50px);
    margin-left: 0;
    margin-top: 5px;
    resize: none;
    font-family: "Jost", sans-serif;
    border-radius: 6px;
  }
  button {
    margin-top: 5px;
    margin-left: 10px;
    height: 87px;
    position: absolute;
  }
  button:hover {
    background-color: darken($primary, 20%);
  }
}
</style>
